import {
	IHookFunctions,
	IWebhookFunctions,
	IWebhookResponseData,
	INodeType,
	INodeTypeDescription,
	ICredentialDataDecryptedObject,
	IDataObject,
} from 'n8n-workflow';

import * as crypto from 'crypto';

export class BcdrllcTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BCDR Webhook Trigger',
		name: 'bcdrllcTrigger',
		icon: 'file:bcdrllc.svg',
		group: ['trigger'],
		version: 1,
		description: 'Receive WhatsApp webhook updates (messages, statuses, etc.)',
		defaults: {
			name: 'BCDR Webhook',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'bcdrllcApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'GET,POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Verify Token',
				name: 'verifyToken',
				type: 'string',
				default: '',
				required: true,
				description: 'The verify token for webhook verification (can be any string)',
			},
			{
				displayName: 'Validate Signature',
				name: 'validateSignature',
				type: 'boolean',
				default: true,
				description: 'Whether to validate the X-Hub-Signature-256 header using app secret',
			},
			{
				displayName: 'Filter Updates',
				name: 'filterUpdates',
				type: 'boolean',
				default: false,
				description: 'Whether to filter updates by business account ID and phone number ID',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const credentials = (await this.getCredentials('bcdrllcApi')) as ICredentialDataDecryptedObject;
		const verifyToken = this.getNodeParameter('verifyToken') as string;
		const validateSignature = this.getNodeParameter('validateSignature') as boolean;
		const filterUpdates = this.getNodeParameter('filterUpdates') as boolean;

		// Handle GET request for webhook verification challenge
		if (req.method === 'GET') {
			const mode = req.query['hub.mode'];
			const token = req.query['hub.verify_token'];
			const challenge = req.query['hub.challenge'];

			if (mode === 'subscribe' && token === verifyToken) {
				return {
					webhookResponse: challenge,
				};
			}

			return {
				webhookResponse: 'Error, invalid verification token',
				workflowData: [],
			};
		}

		// Handle POST request with webhook update
		const body = this.getBodyData();
		const bodyString = JSON.stringify(body);
		const signature = this.getHeaderData()['x-hub-signature-256'] as string;

		// Validate signature if enabled
		if (validateSignature) {
			const appSecret = credentials.appSecret as string;
			
			if (!appSecret) {
				throw new Error('App Secret is required when signature validation is enabled');
			}

			if (!signature) {
				return {
					webhookResponse: 'Error, missing signature',
					workflowData: [],
				};
			}

			const hmac = crypto.createHmac('sha256', appSecret);
			hmac.update(bodyString);
			const calculatedSignature = 'sha256=' + hmac.digest('hex');

			if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(calculatedSignature))) {
				return {
					webhookResponse: 'Unmatching signature',
					workflowData: [],
				};
			}
		}

		// Filter updates if enabled
		if (filterUpdates) {
			const businessAccountId = credentials.businessAccountId as string;
			const phoneNumberId = credentials.phoneNumberId as string;

			try {
				const update = body as any;
				const entry = update.entry?.[0];
				
				if (businessAccountId && entry?.id !== businessAccountId) {
					return {
						webhookResponse: 'ok',
						workflowData: [],
					};
				}

				const metadata = entry?.changes?.[0]?.value?.metadata;
				if (phoneNumberId && metadata?.phone_number_id !== phoneNumberId) {
					return {
						webhookResponse: 'ok',
						workflowData: [],
					};
				}
			} catch (error) {
				// If filtering fails, continue processing
			}
		}

		return {
			webhookResponse: 'ok',
			workflowData: [
				[
					{
						json: body as IDataObject,
					},
				],
			],
		};
	}
}
