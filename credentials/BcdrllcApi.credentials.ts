import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BcdrllcApi implements ICredentialType {
	name = 'bcdrllcApi';
	displayName = 'BCDR Cloud API';
	documentationUrl = 'https://bcdr.sa/docs/api';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Cloud API access token from the developer portal',
		},
		{
			displayName: 'Phone Number ID',
			name: 'phoneNumberId',
			type: 'string',
			default: '',
			required: true,
			description: 'The Business Phone Number ID',
		},
		{
			displayName: 'Business Account ID',
			name: 'businessAccountId',
			type: 'string',
			default: '',
			description: 'Business Account ID (required for templates, flows, and phone number management)',
		},
		{
			displayName: 'API Version',
			name: 'apiVersion',
			type: 'string',
			default: 'v24.0',
			description: 'Cloud API version (e.g., v24.0)',
		},
		{
			displayName: 'App Secret',
			name: 'appSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'App Secret for webhook signature validation (required for webhook triggers)',
		},
		{
			displayName: 'Business Private Key',
			name: 'businessPrivateKey',
			type: 'string',
			typeOptions: {
				password: true,
				rows: 10,
			},
			default: '',
			description: 'Private key for Flow encryption (PEM format, required for Flow webhooks)',
		},
		{
			displayName: 'Business Private Key Password',
			name: 'businessPrivateKeyPassword',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Password for the private key (if encrypted)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://graph.facebook.com/{{$credentials.apiVersion}}',
			url: '=/{{$credentials.phoneNumberId}}',
			method: 'GET',
		},
	};
}
