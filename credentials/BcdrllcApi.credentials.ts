import {
IAuthenticateGeneric,
ICredentialTestRequest,
ICredentialType,
INodeProperties,
} from 'n8n-workflow';

export class BcdrllcApi implements ICredentialType {
name = 'bcdrllcApi';
displayName = 'Bcdrllc API';
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
description: 'Your WhatsApp Cloud API access token from Meta for Developers',
},
{
displayName: 'Phone Number ID',
name: 'phoneNumberId',
type: 'string',
default: '',
required: true,
description: 'The WhatsApp Business Phone Number ID',
},
{
displayName: 'Business Account ID',
name: 'businessAccountId',
type: 'string',
default: '',
description: 'WhatsApp Business Account ID (optional, for advanced features)',
},
{
displayName: 'API Version',
name: 'apiVersion',
type: 'string',
default: 'v21.0',
description: 'WhatsApp Cloud API version',
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
