import {
IExecuteFunctions,
INodeExecutionData,
INodeType,
INodeTypeDescription,
NodeOperationError,
} from 'n8n-workflow';

import FormData from 'form-data';

export class Bcdrllc implements INodeType {
description: INodeTypeDescription = {
displayName: 'Bcdrllc',
name: 'bcdrllc',
icon: 'file:bcdrllc.svg',
group: ['transform'],
version: 1,
subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
description: 'Send messages via BCDR Company Cloud API integration',
defaults: {
name: 'Bcdrllc',
},
inputs: ['main'],
outputs: ['main'],
credentials: [
{
name: 'bcdrllcApi',
required: true,
},
],
properties: [
{
displayName: 'Resource',
name: 'resource',
type: 'options',
noDataExpression: true,
options: [
{
name: 'Message',
value: 'message',
},
{
name: 'Media',
value: 'media',
},
{
name: 'Template',
value: 'template',
},
],
default: 'message',
},
// Message Operations
{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: ['message'],
},
},
options: [
{
name: 'Send Text',
value: 'sendText',
description: 'Send a text message',
action: 'Send a text message',
},
{
name: 'Send Interactive',
value: 'sendInteractive',
description: 'Send an interactive message with buttons',
action: 'Send an interactive message',
},
{
name: 'Send Location',
value: 'sendLocation',
description: 'Send a location',
action: 'Send a location',
},
{
name: 'Send Contact',
value: 'sendContact',
description: 'Send a contact',
action: 'Send a contact',
},
{
name: 'React to Message',
value: 'react',
description: 'React to a message with an emoji',
action: 'React to a message',
},
],
default: 'sendText',
},
// Media Operations
{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: ['media'],
},
},
options: [
{
name: 'Send Image',
value: 'sendImage',
description: 'Send an image',
action: 'Send an image',
},
{
name: 'Send Video',
value: 'sendVideo',
description: 'Send a video',
action: 'Send a video',
},
{
name: 'Send Audio',
value: 'sendAudio',
description: 'Send an audio file',
action: 'Send an audio file',
},
{
name: 'Send Document',
value: 'sendDocument',
description: 'Send a document',
action: 'Send a document',
},
{
name: 'Send Sticker',
value: 'sendSticker',
description: 'Send a sticker',
action: 'Send a sticker',
},
],
default: 'sendImage',
},
// Template Operations
{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: ['template'],
},
},
options: [
{
name: 'Send Template',
value: 'sendTemplate',
description: 'Send a template message',
action: 'Send a template message',
},
],
default: 'sendTemplate',
},
// Recipient Phone Number (required for all operations)
{
displayName: 'To',
name: 'to',
type: 'string',
default: '',
required: true,
description: 'Phone number (with country code, e.g., 966565430200)',
},
// Text Message Fields
{
displayName: 'Message',
name: 'message',
type: 'string',
typeOptions: {
rows: 4,
},
displayOptions: {
show: {
resource: ['message'],
operation: ['sendText'],
},
},
default: '',
required: true,
description: 'The text message to send',
},
{
displayName: 'Preview URL',
name: 'previewUrl',
type: 'boolean',
displayOptions: {
show: {
resource: ['message'],
operation: ['sendText'],
},
},
default: false,
description: 'Whether to show URL preview in the message',
},
// Interactive Message Fields
{
displayName: 'Body Text',
name: 'bodyText',
type: 'string',
typeOptions: {
rows: 3,
},
displayOptions: {
show: {
resource: ['message'],
operation: ['sendInteractive'],
},
},
default: '',
required: true,
description: 'The message body text',
},
{
displayName: 'Buttons',
name: 'buttons',
type: 'json',
displayOptions: {
show: {
resource: ['message'],
operation: ['sendInteractive'],
},
},
default: '[{"type": "reply", "reply": {"id": "button_1", "title": "Button 1"}}]',
description: 'Buttons array in JSON format',
},
{
displayName: 'Header Text',
name: 'headerText',
type: 'string',
displayOptions: {
show: {
resource: ['message'],
operation: ['sendInteractive'],
},
},
default: '',
description: 'Optional header text',
},
{
displayName: 'Footer Text',
name: 'footerText',
type: 'string',
displayOptions: {
show: {
resource: ['message'],
operation: ['sendInteractive'],
},
},
default: '',
description: 'Optional footer text',
},
// Location Fields
{
displayName: 'Latitude',
name: 'latitude',
type: 'number',
displayOptions: {
show: {
resource: ['message'],
operation: ['sendLocation'],
},
},
default: 0,
required: true,
description: 'Latitude coordinate',
},
{
displayName: 'Longitude',
name: 'longitude',
type: 'number',
displayOptions: {
show: {
resource: ['message'],
operation: ['sendLocation'],
},
},
default: 0,
required: true,
description: 'Longitude coordinate',
},
{
displayName: 'Name',
name: 'locationName',
type: 'string',
displayOptions: {
show: {
resource: ['message'],
operation: ['sendLocation'],
},
},
default: '',
description: 'Location name',
},
{
displayName: 'Address',
name: 'locationAddress',
type: 'string',
displayOptions: {
show: {
resource: ['message'],
operation: ['sendLocation'],
},
},
default: '',
description: 'Location address',
},
// Contact Fields
{
displayName: 'Contacts',
name: 'contacts',
type: 'json',
displayOptions: {
show: {
resource: ['message'],
operation: ['sendContact'],
},
},
default: '[{"name": {"formatted_name": "John Doe", "first_name": "John"}, "phones": [{"phone": "+966565430200", "type": "MOBILE"}]}]',
required: true,
description: 'Contact information in JSON format',
},
// React Fields
{
displayName: 'Message ID',
name: 'messageId',
type: 'string',
displayOptions: {
show: {
resource: ['message'],
operation: ['react'],
},
},
default: '',
required: true,
description: 'The ID of the message to react to',
},
{
displayName: 'Emoji',
name: 'emoji',
type: 'string',
displayOptions: {
show: {
resource: ['message'],
operation: ['react'],
},
},
default: '👍',
required: true,
description: 'The emoji to react with',
},
// Media Fields
{
displayName: 'Media URL',
name: 'mediaUrl',
type: 'string',
displayOptions: {
show: {
resource: ['media'],
},
},
default: '',
required: true,
description: 'URL of the media file to send',
},
{
displayName: 'Caption',
name: 'caption',
type: 'string',
displayOptions: {
show: {
resource: ['media'],
operation: ['sendImage', 'sendVideo', 'sendDocument'],
},
},
default: '',
description: 'Optional caption for the media',
},
{
displayName: 'Filename',
name: 'filename',
type: 'string',
displayOptions: {
show: {
resource: ['media'],
operation: ['sendDocument'],
},
},
default: '',
description: 'Optional filename for the document',
},
// Template Fields
{
displayName: 'Template Name',
name: 'templateName',
type: 'string',
displayOptions: {
show: {
resource: ['template'],
operation: ['sendTemplate'],
},
},
default: '',
required: true,
description: 'Name of the template to send',
},
{
displayName: 'Language Code',
name: 'languageCode',
type: 'string',
displayOptions: {
show: {
resource: ['template'],
operation: ['sendTemplate'],
},
},
default: 'en',
required: true,
description: 'Language code of the template (e.g., en, ar)',
},
{
displayName: 'Components',
name: 'components',
type: 'json',
displayOptions: {
show: {
resource: ['template'],
operation: ['sendTemplate'],
},
},
default: '[]',
description: 'Template components/parameters in JSON format',
},
],
};

async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
const items = this.getInputData();
const returnData: INodeExecutionData[] = [];
const credentials = await this.getCredentials('bcdrllcApi');

const baseUrl = `https://graph.facebook.com/${credentials.apiVersion}/${credentials.phoneNumberId}`;

for (let i = 0; i < items.length; i++) {
try {
const resource = this.getNodeParameter('resource', i) as string;
const operation = this.getNodeParameter('operation', i) as string;
const to = this.getNodeParameter('to', i) as string;

let body: any = {
messaging_product: 'whatsapp',
recipient_type: 'individual',
to: to,
};

if (resource === 'message') {
if (operation === 'sendText') {
const message = this.getNodeParameter('message', i) as string;
const previewUrl = this.getNodeParameter('previewUrl', i) as boolean;

body.type = 'text';
body.text = {
preview_url: previewUrl,
body: message,
};
} else if (operation === 'sendInteractive') {
const bodyText = this.getNodeParameter('bodyText', i) as string;
const buttonsJson = this.getNodeParameter('buttons', i) as string;
const headerText = this.getNodeParameter('headerText', i, '') as string;
const footerText = this.getNodeParameter('footerText', i, '') as string;

const buttons = JSON.parse(buttonsJson);

body.type = 'interactive';
body.interactive = {
type: 'button',
body: { text: bodyText },
action: { buttons },
};

if (headerText) {
body.interactive.header = {
type: 'text',
text: headerText,
};
}

if (footerText) {
body.interactive.footer = { text: footerText };
}
} else if (operation === 'sendLocation') {
const latitude = this.getNodeParameter('latitude', i) as number;
const longitude = this.getNodeParameter('longitude', i) as number;
const locationName = this.getNodeParameter('locationName', i, '') as string;
const locationAddress = this.getNodeParameter('locationAddress', i, '') as string;

body.type = 'location';
body.location = {
latitude,
longitude,
name: locationName,
address: locationAddress,
};
} else if (operation === 'sendContact') {
const contactsJson = this.getNodeParameter('contacts', i) as string;
const contacts = JSON.parse(contactsJson);

body.type = 'contacts';
body.contacts = contacts;
} else if (operation === 'react') {
const messageId = this.getNodeParameter('messageId', i) as string;
const emoji = this.getNodeParameter('emoji', i) as string;

body.type = 'reaction';
body.reaction = {
message_id: messageId,
emoji: emoji,
};
}
} else if (resource === 'media') {
const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;
const caption = this.getNodeParameter('caption', i, '') as string;

if (operation === 'sendImage') {
body.type = 'image';
body.image = { link: mediaUrl };
if (caption) body.image.caption = caption;
} else if (operation === 'sendVideo') {
body.type = 'video';
body.video = { link: mediaUrl };
if (caption) body.video.caption = caption;
} else if (operation === 'sendAudio') {
body.type = 'audio';
body.audio = { link: mediaUrl };
} else if (operation === 'sendDocument') {
const filename = this.getNodeParameter('filename', i, '') as string;
body.type = 'document';
body.document = { link: mediaUrl };
if (caption) body.document.caption = caption;
if (filename) body.document.filename = filename;
} else if (operation === 'sendSticker') {
body.type = 'sticker';
body.sticker = { link: mediaUrl };
}
} else if (resource === 'template') {
if (operation === 'sendTemplate') {
const templateName = this.getNodeParameter('templateName', i) as string;
const languageCode = this.getNodeParameter('languageCode', i) as string;
const componentsJson = this.getNodeParameter('components', i, '[]') as string;

const components = JSON.parse(componentsJson);

body.type = 'template';
body.template = {
name: templateName,
language: {
code: languageCode,
},
components: components,
};
}
}

const response = await this.helpers.httpRequestWithAuthentication.call(
this,
'bcdrllcApi',
{
method: 'POST',
url: `${baseUrl}/messages`,
body: body,
json: true,
},
);

returnData.push({
json: response,
pairedItem: i,
});
} catch (error) {
if (this.continueOnFail()) {
returnData.push({
json: {
error: error.message,
},
pairedItem: i,
});
continue;
}
throw error;
}
}

return [returnData];
}
}
