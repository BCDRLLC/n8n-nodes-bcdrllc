import {
	IHookFunctions,
	IWebhookFunctions,
	IWebhookResponseData,
	INodeType,
	INodeTypeDescription,
	ICredentialDataDecryptedObject,
	IDataObject,
	NodeOperationError,
} from 'n8n-workflow';

import { decryptFlowRequest, encryptFlowResponse } from '../../utils/encryption';

export class BcdrllcFlowTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BCDR Flow Trigger',
		name: 'bcdrllcFlowTrigger',
		icon: 'file:bcdrllc.svg',
		group: ['trigger'],
		version: 1,
		description: 'Handle WhatsApp Flow data exchange requests with encryption',
		defaults: {
			name: 'BCDR Flow',
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
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'flow',
			},
		],
		properties: [
			{
				displayName: 'Acknowledge Errors',
				name: 'acknowledgeErrors',
				type: 'boolean',
				default: true,
				description: 'Whether to automatically acknowledge errors from the Flow request',
			},
			{
				displayName: 'Response Mode',
				name: 'responseMode',
				type: 'options',
				options: [
					{
						name: 'Auto Respond',
						value: 'auto',
						description: 'Automatically send an empty response (useful for INIT/BACK actions)',
					},
					{
						name: 'From Workflow',
						value: 'workflow',
						description: 'Use workflow output to build the response',
					},
				],
				default: 'workflow',
				description: 'How to generate the Flow response',
			},
			{
				displayName: 'Response Options',
				name: 'responseOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						responseMode: ['workflow'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Screen',
						name: 'screen',
						type: 'string',
						default: '',
						description: 'The screen to navigate to (leave empty to close flow)',
					},
					{
						displayName: 'Data',
						name: 'data',
						type: 'json',
						default: '{}',
						description: 'The data to send to the screen (JSON format)',
					},
					{
						displayName: 'Error Message',
						name: 'errorMessage',
						type: 'string',
						default: '',
						description: 'Optional error message to display',
					},
					{
						displayName: 'Close Flow',
						name: 'closeFlow',
						type: 'boolean',
						default: false,
						description: 'Whether to close the flow (requires flow_token)',
					},
				],
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
		const credentials = (await this.getCredentials('bcdrllcApi')) as ICredentialDataDecryptedObject;
		const acknowledgeErrors = this.getNodeParameter('acknowledgeErrors') as boolean;
		const responseMode = this.getNodeParameter('responseMode') as string;
		
		const privateKey = credentials.businessPrivateKey as string;
		const privateKeyPassword = credentials.businessPrivateKeyPassword as string | undefined;

		if (!privateKey) {
			throw new NodeOperationError(
				this.getNode(),
				'Business Private Key is required for Flow encryption',
			);
		}

		const body = this.getBodyData();
		const payload = body as IDataObject;

		// Handle health check (ping)
		if (payload.action === 'ping') {
			const { aesKey, iv } = decryptFlowRequest(
				payload.encrypted_flow_data as string,
				payload.encrypted_aes_key as string,
				payload.initial_vector as string,
				privateKey,
				privateKeyPassword,
			);

			const response = {
				data: { status: 'active' },
			};

			const encryptedResponse = encryptFlowResponse(response, aesKey, iv);

			return {
				webhookResponse: encryptedResponse,
				workflowData: [],
			};
		}

		// Decrypt the Flow request
		let decryptedData: any;
		let aesKey: Buffer;
		let iv: Buffer;

		try {
			const decrypted = decryptFlowRequest(
				payload.encrypted_flow_data as string,
				payload.encrypted_aes_key as string,
				payload.initial_vector as string,
				privateKey,
				privateKeyPassword,
			);

			decryptedData = decrypted.decryptedData;
			aesKey = decrypted.aesKey;
			iv = decrypted.iv;
		} catch (error) {
			return {
				webhookResponse: 'Decryption failed',
				workflowData: [],
			};
		}

		// Check for errors in the request
		const hasError =
			decryptedData.data &&
			(decryptedData.data.error ||
				decryptedData.data.error_message ||
				decryptedData.data.error_key);

		if (acknowledgeErrors && hasError) {
			const response = {
				version: decryptedData.version,
				data: {
					acknowledged: true,
				},
			};

			const encryptedResponse = encryptFlowResponse(response, aesKey, iv);

			return {
				webhookResponse: encryptedResponse,
				workflowData: [
					[
						{
							json: {
								...decryptedData,
								encrypted_payload: payload,
								has_error: true,
							},
						},
					],
				],
			};
		}

		// Auto respond mode
		if (responseMode === 'auto') {
			const response = {
				version: decryptedData.version,
				screen: decryptedData.screen || 'SUCCESS',
				data: {},
			};

			const encryptedResponse = encryptFlowResponse(response, aesKey, iv);

			return {
				webhookResponse: encryptedResponse,
				workflowData: [
					[
						{
							json: {
								...decryptedData,
								encrypted_payload: payload,
								auto_responded: true,
							},
						},
					],
				],
			};
		}

		// Workflow mode - store aesKey and iv for response generation
		return {
			webhookResponse: {}, // Will be replaced by workflow output
			workflowData: [
				[
					{
						json: {
							...decryptedData,
							encrypted_payload: payload,
							_encryption: {
								aesKey: aesKey.toString('base64'),
								iv: iv.toString('base64'),
							},
						},
					},
				],
			],
		};
	}
}
