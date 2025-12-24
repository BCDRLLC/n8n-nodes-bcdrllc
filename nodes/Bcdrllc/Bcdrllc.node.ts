import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class Bcdrllc implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BCDR Cloud API',
		name: 'bcdrllc',
		icon: 'file:bcdrllc.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'BCDR Company Cloud API integration for business communications',
		defaults: {
			name: 'BCDR Cloud API',
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
			// ========================================
			// RESOURCE SELECTION
			// ========================================
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Message',
						value: 'message',
						description: 'Send text, interactive, location, and contact messages',
					},
					{
						name: 'Media',
						value: 'media',
						description: 'Send and manage media files',
					},
					{
						name: 'Template',
						value: 'template',
						description: 'Send and manage message templates',
					},
					{
						name: 'Business Profile',
						value: 'businessProfile',
						description: 'Manage business profile settings',
					},
					{
						name: 'Phone Number',
						value: 'phoneNumber',
						description: 'Manage phone number settings',
					},
					{
						name: 'Flow',
						value: 'flow',
						description: 'Manage interactive flows',
					},
					{
						name: 'QR Code',
						value: 'qrCode',
						description: 'Create and manage QR codes',
					},
					{
						name: 'User',
						value: 'user',
						description: 'Block/unblock users',
					},
					{
						name: 'System',
						value: 'system',
						description: 'System-level operations',
					},
				],
				default: 'message',
			},

			// ========================================
			// MESSAGE OPERATIONS
			// ========================================
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
						name: 'Send Interactive Buttons',
						value: 'sendInteractiveButtons',
						description: 'Send an interactive message with buttons',
						action: 'Send an interactive buttons message',
					},
					{
						name: 'Send Interactive List',
						value: 'sendInteractiveList',
						description: 'Send an interactive message with a list',
						action: 'Send an interactive list message',
					},
					{
						name: 'Send Flow',
						value: 'sendFlow',
						description: 'Send an interactive Flow message',
						action: 'Send a Flow message',
					},
					{
						name: 'Send Location',
						value: 'sendLocation',
						description: 'Send a location',
						action: 'Send a location',
					},
					{
						name: 'Request Location',
						value: 'requestLocation',
						description: 'Request location from user',
						action: 'Request location from user',
					},
					{
						name: 'Send Contact',
						value: 'sendContact',
						description: 'Send contact information',
						action: 'Send a contact',
					},
					{
						name: 'Send Catalog',
						value: 'sendCatalog',
						description: 'Send product catalog',
						action: 'Send product catalog',
					},
					{
						name: 'Send Product',
						value: 'sendProduct',
						description: 'Send a single product',
						action: 'Send a product',
					},
					{
						name: 'Send Products',
						value: 'sendProducts',
						description: 'Send multiple products',
						action: 'Send multiple products',
					},
					{
						name: 'Send Reaction',
						value: 'sendReaction',
						description: 'React to a message with an emoji',
						action: 'Send a reaction',
					},
					{
						name: 'Remove Reaction',
						value: 'removeReaction',
						description: 'Remove reaction from a message',
						action: 'Remove a reaction',
					},
					{
						name: 'Mark As Read',
						value: 'markAsRead',
						description: 'Mark a message as read',
						action: 'Mark message as read',
					},
					{
						name: 'Set Typing Indicator',
						value: 'setTypingIndicator',
						description: 'Show typing indicator to user',
						action: 'Set typing indicator',
					},
					{
						name: 'Send Marketing Message',
						value: 'sendMarketingMessage',
						description: 'Send marketing template with tracking',
						action: 'Send marketing message',
					},
					{
						name: 'Send Raw Request',
						value: 'sendRawRequest',
						description: 'Send custom API request',
						action: 'Send raw request',
					},
				],
				default: 'sendText',
			},			// ========================================
			// MEDIA OPERATIONS
			// ========================================
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
						name: 'Send Voice',
						value: 'sendVoice',
						description: 'Send a voice message',
						action: 'Send a voice message',
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
					{
						name: 'Upload Media',
						value: 'uploadMedia',
						description: 'Upload media to get a media ID',
						action: 'Upload media',
					},
					{
						name: 'Get Media URL',
						value: 'getMediaUrl',
						description: 'Get URL of uploaded media',
						action: 'Get media URL',
					},
					{
						name: 'Download Media',
						value: 'downloadMedia',
						description: 'Download media file',
						action: 'Download media',
					},
					{
						name: 'Delete Media',
						value: 'deleteMedia',
						description: 'Delete uploaded media',
						action: 'Delete media',
					},
					{
						name: 'Create Upload Session',
						value: 'createUploadSession',
						description: 'Create session for large file upload (>25MB)',
						action: 'Create upload session',
					},
					{
						name: 'Upload File to Session',
						value: 'uploadFileToSession',
						description: 'Upload file chunks to upload session',
						action: 'Upload file to session',
					},
					{
						name: 'Get Upload Session',
						value: 'getUploadSession',
						description: 'Get status of upload session',
						action: 'Get upload session status',
					},
				],
				default: 'sendImage',
			},

			// ========================================
			// TEMPLATE OPERATIONS
			// ========================================
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
					{
						name: 'Get Templates',
						value: 'getTemplates',
						description: 'Get all message templates',
						action: 'Get templates',
					},
					{
						name: 'Get Template',
						value: 'getTemplate',
						description: 'Get a specific template by ID',
						action: 'Get template',
					},
					{
						name: 'Create Template',
						value: 'createTemplate',
						description: 'Create a new message template',
						action: 'Create template',
					},
					{
						name: 'Update Template',
						value: 'updateTemplate',
						description: 'Update an existing template',
						action: 'Update template',
					},
					{
						name: 'Delete Template',
						value: 'deleteTemplate',
						description: 'Delete a message template',
						action: 'Delete template',
					},
					{
						name: 'Unpause Template',
						value: 'unpauseTemplate',
						description: 'Unpause a previously paused template',
						action: 'Unpause template',
					},
					{
						name: 'Upsert Message Templates',
						value: 'upsertMessageTemplates',
						description: 'Bulk create/update authentication templates',
						action: 'Upsert message templates',
					},
					{
						name: 'Compare Templates',
						value: 'compareTemplates',
						description: 'Compare performance of two templates',
						action: 'Compare templates',
					},
					{
						name: 'Migrate Templates',
						value: 'migrateTemplates',
						description: 'Migrate templates between WABAs',
						action: 'Migrate templates',
					},
				],
				default: 'sendTemplate',
			},

			// ========================================
			// BUSINESS PROFILE OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['businessProfile'],
					},
				},
				options: [
					{
						name: 'Get Profile',
						value: 'getProfile',
						description: 'Get business profile information',
						action: 'Get business profile',
					},
					{
						name: 'Update Profile',
						value: 'updateProfile',
						description: 'Update business profile information',
						action: 'Update business profile',
					},
					{
						name: 'Get Business Account',
						value: 'getBusinessAccount',
						description: 'Get business account details',
						action: 'Get business account',
					},
					{
						name: 'Update Conversational Automation',
						value: 'updateConversationalAutomation',
						description: 'Update commands and ice breakers',
						action: 'Update conversational automation',
					},
					{
						name: 'Get Commerce Settings',
						value: 'getCommerceSettings',
						description: 'Get commerce settings',
						action: 'Get commerce settings',
					},
					{
						name: 'Update Commerce Settings',
						value: 'updateCommerceSettings',
						description: 'Update commerce settings',
						action: 'Update commerce settings',
					},
					{
						name: 'Get Business Public Key',
						value: 'getBusinessPublicKey',
						description: 'Get business public key for encryption',
						action: 'Get business public key',
					},
					{
						name: 'Set Business Public Key',
						value: 'setBusinessPublicKey',
						description: 'Set business public key for encryption',
						action: 'Set business public key',
					},
					{
						name: 'Set Webhook URL',
						value: 'setWebhookUrl',
						description: 'Set alternate callback URL for WABA',
						action: 'Set webhook URL',
					},
					{
						name: 'Delete Webhook URL',
						value: 'deleteWebhookUrl',
						description: 'Delete alternate callback URL',
						action: 'Delete webhook URL',
					},
					{
						name: 'Get Subscribed Apps',
						value: 'getSubscribedApps',
						description: 'Get apps subscribed to webhooks',
						action: 'Get subscribed apps',
					},
				],
				default: 'getProfile',
			},

			// ========================================
			// PHONE NUMBER OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['phoneNumber'],
					},
				},
				options: [
					{
						name: 'Get Phone Numbers',
						value: 'getPhoneNumbers',
						description: 'Get all business phone numbers',
						action: 'Get phone numbers',
					},
					{
						name: 'Get Phone Number',
						value: 'getPhoneNumber',
						description: 'Get details of a specific phone number',
						action: 'Get phone number',
					},
					{
						name: 'Register Phone',
						value: 'registerPhone',
						description: 'Register a phone number',
						action: 'Register phone number',
					},
					{
						name: 'Deregister Phone',
						value: 'deregisterPhone',
						description: 'Deregister a phone number',
						action: 'Deregister phone number',
					},
					{
						name: 'Get Phone Settings',
						value: 'getPhoneSettings',
						description: 'Get phone number settings',
						action: 'Get phone settings',
					},
					{
						name: 'Update Phone Settings',
						value: 'updatePhoneSettings',
						description: 'Update phone number settings',
						action: 'Update phone settings',
					},
					{
						name: 'Update Display Name',
						value: 'updateDisplayName',
						description: 'Update business display name',
						action: 'Update display name',
					},
					{
						name: 'Update Conversational Automation',
						value: 'updateConversationalAutomation',
						description: 'Update ice breakers and commands',
						action: 'Update conversational automation',
					},
					{
						name: 'Set Phone Webhook URL',
						value: 'setPhoneWebhookUrl',
						description: 'Set alternate callback URL for phone',
						action: 'Set phone webhook URL',
					},
					{
						name: 'Delete Phone Webhook URL',
						value: 'deletePhoneWebhookUrl',
						description: 'Delete phone alternate callback URL',
						action: 'Delete phone webhook URL',
					},
				],
				default: 'getPhoneNumbers',
			},

			// ========================================
			// FLOW OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['flow'],
					},
				},
				options: [
					{
						name: 'Get Flows',
						value: 'getFlows',
						description: 'Get all flows',
						action: 'Get flows',
					},
					{
						name: 'Get Flow',
						value: 'getFlow',
						description: 'Get a specific flow',
						action: 'Get flow',
					},
					{
						name: 'Create Flow',
						value: 'createFlow',
						description: 'Create a new flow',
						action: 'Create flow',
					},
					{
						name: 'Update Flow Metadata',
						value: 'updateFlow',
						description: 'Update flow metadata',
						action: 'Update flow metadata',
					},
					{
						name: 'Update Flow JSON',
						value: 'updateFlowJson',
						description: 'Update flow JSON definition',
						action: 'Update flow JSON',
					},
					{
						name: 'Publish Flow',
						value: 'publishFlow',
						description: 'Publish a flow',
						action: 'Publish flow',
					},
					{
						name: 'Deprecate Flow',
						value: 'deprecateFlow',
						description: 'Deprecate a flow',
						action: 'Deprecate flow',
					},
					{
						name: 'Delete Flow',
						value: 'deleteFlow',
						description: 'Delete a flow',
						action: 'Delete flow',
					},
					{
						name: 'Get Flow Metrics',
						value: 'getFlowMetrics',
						description: 'Get flow performance metrics',
						action: 'Get flow metrics',
					},
					{
						name: 'Get Flow Assets',
						value: 'getFlowAssets',
						description: 'Get flow assets',
						action: 'Get flow assets',
					},
					{
						name: 'Migrate Flows',
						value: 'migrateFlows',
						description: 'Migrate flows between WABAs',
						action: 'Migrate flows',
					},
					{
						name: 'Exchange Data',
						value: 'exchangeData',
						description: 'Send data to Flow using Data Exchange API',
						action: 'Exchange data with flow',
					},
					{
						name: 'Generate Flow JSON Template',
						value: 'generateFlowTemplate',
						description: 'Generate Flow JSON template with screens and components',
						action: 'Generate flow template',
					},
				],
				default: 'getFlows',
			},
			// ========================================
			// CALL OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['call'],
					},
				},
				options: [
					{
						name: 'Initiate Call',
						value: 'initiateCall',
						description: 'Initiate a voice/video call',
						action: 'Initiate call',
					},
					{
						name: 'Pre-Accept Call',
						value: 'preAcceptCall',
						description: 'Pre-accept an incoming call before fully accepting',
						action: 'Pre-accept call',
					},
					{
						name: 'Accept Call',
						value: 'acceptCall',
						description: 'Accept an incoming call',
						action: 'Accept call',
					},
					{
						name: 'Reject Call',
						value: 'rejectCall',
						description: 'Reject an incoming call',
						action: 'Reject call',
					},
					{
						name: 'End Call',
						value: 'endCall',
						description: 'End an active call',
						action: 'End call',
					},
					{
						name: 'Terminate Call',
						value: 'terminateCall',
						description: 'Terminate an ongoing call',
						action: 'Terminate call',
					},
					{
						name: 'Get Call Permissions',
						value: 'getCallPermissions',
						description: 'Get call permissions for phone number',
						action: 'Get call permissions',
					},
				],
				default: 'initiateCall',
			},

			// ========================================
			// QR CODE OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['qrCode'],
					},
				},
				options: [
					{
						name: 'Create QR Code',
						value: 'createQrCode',
						description: 'Create a new QR code',
						action: 'Create QR code',
					},
					{
						name: 'Get QR Codes',
						value: 'getQrCodes',
						description: 'Get all QR codes',
						action: 'Get QR codes',
					},
					{
						name: 'Get QR Code',
						value: 'getQrCode',
						description: 'Get a specific QR code',
						action: 'Get QR code',
					},
					{
						name: 'Update QR Code',
						value: 'updateQrCode',
						description: 'Update a QR code',
						action: 'Update QR code',
					},
					{
						name: 'Delete QR Code',
						value: 'deleteQrCode',
						description: 'Delete a QR code',
						action: 'Delete QR code',
					},
				],
				default: 'createQrCode',
			},

			// ========================================
			// USER OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Block User',
						value: 'blockUser',
						description: 'Block a user from sending messages',
						action: 'Block user',
					},
					{
						name: 'Unblock User',
						value: 'unblockUser',
						description: 'Unblock a previously blocked user',
						action: 'Unblock user',
					},
					{
						name: 'Get Blocked Users',
						value: 'getBlockedUsers',
						description: 'Get list of blocked users',
						action: 'Get blocked users',
					},
				],
				default: 'blockUser',
			},

			// ========================================
			// SYSTEM OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['system'],
					},
				},
				options: [
					{
						name: 'Get App Access Token',
						value: 'getAppAccessToken',
						description: 'Get app-level access token',
						action: 'Get app access token',
					},
					{
						name: 'Set App Callback URL',
						value: 'setAppCallbackUrl',
						description: 'Set app-level webhook callback URL',
						action: 'Set app callback URL',
					},
				],
				default: 'getAppAccessToken',
			},

			// ========================================
			// COMMON FIELDS - RECIPIENT
			// ========================================
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				default: '',
				required: true,
				placeholder: '966565430200',
				description: 'Recipient phone number with country code (without + sign)',
				displayOptions: {
					show: {
						resource: ['message', 'media'],
						operation: [
							'sendText',
							'sendInteractiveButtons',
							'sendInteractiveList',
							'sendLocation',
							'requestLocation',
							'sendContact',
							'sendCatalog',
							'sendProduct',
							'sendProducts',
							'sendReaction',
							'removeReaction',
							'sendImage',
							'sendVideo',
							'sendAudio',
							'sendVoice',
							'sendDocument',
							'sendSticker',
						],
					},
				},
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				default: '',
				required: true,
				placeholder: '966565430200',
				description: 'Recipient phone number with country code (without + sign)',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['sendTemplate'],
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'userPhone',
				type: 'string',
				default: '',
				required: true,
				placeholder: '966565430200',
				description: 'User phone number to block/unblock',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['blockUser', 'unblockUser'],
					},
				},
			},

			// ========================================
			// TEXT MESSAGE FIELDS
			// ========================================
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
				description: 'The text message to send (max 4096 characters)',
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
				description: 'Whether to show a preview of any URL in the message',
			},

			// ========================================
			// INTERACTIVE BUTTONS FIELDS
			// ========================================
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
						operation: ['sendInteractiveButtons', 'sendInteractiveList'],
					},
				},
				default: '',
				required: true,
				description: 'The message body text (max 1024 characters)',
			},
			{
				displayName: 'Buttons',
				name: 'buttons',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					maxValue: 3,
				},
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendInteractiveButtons'],
					},
				},
				default: {},
				options: [
					{
						name: 'buttonValues',
						displayName: 'Button',
						values: [
							{
								displayName: 'Button ID',
								name: 'id',
								type: 'string',
								default: '',
								required: true,
								description: 'Unique identifier for the button (max 256 characters)',
							},
							{
								displayName: 'Button Title',
								name: 'title',
								type: 'string',
								default: '',
								required: true,
								description: 'Button text (max 20 characters)',
							},
						],
					},
				],
				description: 'Reply buttons (max 3)',
			},
			{
				displayName: 'Header Text',
				name: 'headerText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendInteractiveButtons', 'sendInteractiveList'],
					},
				},
				default: '',
				description: 'Optional header text (max 60 characters)',
			},
			{
				displayName: 'Footer Text',
				name: 'footerText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendInteractiveButtons', 'sendInteractiveList'],
					},
				},
				default: '',
				description: 'Optional footer text (max 60 characters)',
			},

			// ========================================
			// INTERACTIVE LIST FIELDS
			// ========================================
			{
				displayName: 'Button Text',
				name: 'buttonText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendInteractiveList'],
					},
				},
				default: 'Select',
				required: true,
				description: 'Text for the list button (max 20 characters)',
			},
			{
				displayName: 'Sections',
				name: 'sections',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					maxValue: 10,
				},
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendInteractiveList'],
					},
				},
				default: {},
				options: [
					{
						name: 'sectionValues',
						displayName: 'Section',
						values: [
							{
								displayName: 'Section Title',
								name: 'title',
								type: 'string',
								default: '',
								description: 'Section title (max 24 characters)',
							},
							{
								displayName: 'Rows',
								name: 'rows',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
									maxValue: 10,
								},
								default: {},
								options: [
									{
										name: 'rowValues',
										displayName: 'Row',
										values: [
											{
												displayName: 'Row ID',
												name: 'id',
												type: 'string',
												default: '',
												required: true,
												description: 'Unique identifier for the row (max 200 characters)',
											},
											{
												displayName: 'Row Title',
												name: 'title',
												type: 'string',
												default: '',
												required: true,
												description: 'Row title (max 24 characters)',
											},
											{
												displayName: 'Description',
												name: 'description',
												type: 'string',
												default: '',
												description: 'Row description (max 72 characters)',
											},
										],
									},
								],
							},
						],
					},
				],
				description: 'List sections (max 10 sections, max 10 rows per section)',
			},

			// ========================================
			// FLOW FIELDS
			// ========================================
			{
				displayName: 'Flow ID',
				name: 'flowId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendFlow'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the Flow to send',
			},
			{
				displayName: 'Flow Action',
				name: 'flowAction',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendFlow'],
					},
				},
				options: [
					{
						name: 'Navigate',
						value: 'navigate',
						description: 'Navigate to a specific screen in the Flow',
					},
					{
						name: 'Data Exchange',
						value: 'data_exchange',
						description: 'Send data to the Flow',
					},
				],
				default: 'navigate',
				required: true,
				description: 'The action type for the Flow',
			},
			{
				displayName: 'Flow Action Payload',
				name: 'flowActionPayload',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendFlow'],
					},
				},
				default: '{}',
				required: true,
				description: 'JSON payload for the Flow action',
			},
			{
				displayName: 'Header Text',
				name: 'headerText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendFlow'],
					},
				},
				default: '',
				description: 'Optional header text',
			},
			{
				displayName: 'Body Text',
				name: 'bodyText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendFlow'],
					},
				},
				default: '',
				required: true,
				description: 'Body text for the Flow message',
			},
			{
				displayName: 'Footer Text',
				name: 'footerText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendFlow'],
					},
				},
				default: '',
				description: 'Optional footer text',
			},
			{
				displayName: 'Flow CTA',
				name: 'flowCta',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendFlow'],
					},
				},
				default: 'Open Flow',
				required: true,
				description: 'Call-to-action button text (max 20 characters)',
			},
			{
				displayName: 'Flow Mode',
				name: 'flowMode',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendFlow'],
					},
				},
				options: [
					{
						name: 'Published',
						value: 'published',
						description: 'Use the published version of the Flow',
					},
					{
						name: 'Draft',
						value: 'draft',
						description: 'Use the draft version of the Flow (for testing)',
					},
				],
				default: 'published',
				description: 'Flow version mode',
			},

			// ========================================
			// LOCATION FIELDS
			// ========================================
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'number',
				typeOptions: {
					numberPrecision: 6,
				},
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
				typeOptions: {
					numberPrecision: 6,
				},
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
				displayName: 'Location Name',
				name: 'locationName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
				default: '',
				description: 'Name of the location',
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
				description: 'Address of the location',
			},

			// ========================================
			// CONTACT FIELDS
			// ========================================
			{
				displayName: 'Contacts',
				name: 'contacts',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendContact'],
					},
				},
				default: {},
				options: [
					{
						name: 'contactValues',
						displayName: 'Contact',
						values: [
							{
								displayName: 'First Name',
								name: 'firstName',
								type: 'string',
								default: '',
								required: true,
							},
							{
								displayName: 'Last Name',
								name: 'lastName',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Phone',
								name: 'phone',
								type: 'string',
								default: '',
								required: true,
								description: 'Phone number with country code',
							},
							{
								displayName: 'Email',
								name: 'email',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Company',
								name: 'company',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},

			// ========================================
			// REACTION FIELDS
			// ========================================
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendReaction', 'removeReaction', 'markAsRead', 'setTypingIndicator'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the message',
			},
			{
				displayName: 'Emoji',
				name: 'emoji',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendReaction'],
					},
				},
				default: '👍',
				required: true,
				description: 'The emoji to react with (leave empty to remove reaction)',
			},

			// ========================================
			// REQUEST LOCATION FIELDS
			// ========================================
			{
				displayName: 'Body Text',
				name: 'requestLocationBody',
				type: 'string',
				typeOptions: {
					rows: 2,
				},
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['requestLocation'],
					},
				},
				default: 'Please share your location',
				required: true,
				description: 'Message body text for location request',
			},

			// ========================================
			// CATALOG/PRODUCT FIELDS
			// ========================================
			{
				displayName: 'Body Text',
				name: 'catalogBody',
				type: 'string',
				typeOptions: {
					rows: 2,
				},
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendCatalog'],
					},
				},
				default: 'Check out our products',
				description: 'Message body text for catalog',
			},
			{
				displayName: 'Product Retailer ID',
				name: 'productRetailerId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendProduct'],
					},
				},
				default: '',
				required: true,
				description: 'Product retailer ID from your catalog',
			},
			{
				displayName: 'Catalog ID',
				name: 'catalogId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendProduct'],
					},
				},
				default: '',
				required: true,
				description: 'Catalog ID',
			},
			{
				displayName: 'Body Text',
				name: 'productBody',
				type: 'string',
				typeOptions: {
					rows: 2,
				},
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendProduct', 'sendProducts'],
					},
				},
				default: '',
				description: 'Optional body text for product message',
			},
			{
				displayName: 'Header Text',
				name: 'productsHeader',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendProducts'],
					},
				},
				default: '',
				required: true,
				description: 'Header text for multi-product message',
			},
			{
				displayName: 'Product Items',
				name: 'productItems',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					maxValue: 30,
				},
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendProducts'],
					},
				},
				default: {},
				options: [
					{
						name: 'itemValues',
						displayName: 'Product',
						values: [
							{
								displayName: 'Product Retailer ID',
								name: 'productRetailerId',
								type: 'string',
								default: '',
								required: true,
							},
						],
					},
				],
				description: 'Products to include (max 30)',
			},
			{
				displayName: 'Catalog ID',
				name: 'catalogIdProducts',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendProducts'],
					},
				},
				default: '',
				required: true,
				description: 'Catalog ID for products',
			},

			// ========================================
			// MEDIA FIELDS
			// ========================================
			{
				displayName: 'Media Source',
				name: 'mediaSource',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['sendImage', 'sendVideo', 'sendAudio', 'sendVoice', 'sendDocument', 'sendSticker'],
					},
				},
				options: [
					{
						name: 'URL',
						value: 'url',
						description: 'Use a publicly accessible URL',
					},
					{
						name: 'Media ID',
						value: 'mediaId',
						description: 'Use a previously uploaded media ID',
					},
				],
				default: 'url',
			},
			{
				displayName: 'Media URL',
				name: 'mediaUrl',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['sendImage', 'sendVideo', 'sendAudio', 'sendVoice', 'sendDocument', 'sendSticker'],
						mediaSource: ['url'],
					},
				},
				default: '',
				required: true,
				description: 'Publicly accessible URL of the media file',
			},
			{
				displayName: 'Media ID',
				name: 'mediaId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['sendImage', 'sendVideo', 'sendAudio', 'sendVoice', 'sendDocument', 'sendSticker', 'getMediaUrl', 'deleteMedia'],
						mediaSource: ['mediaId'],
					},
				},
				default: '',
				required: true,
				description: 'ID of the uploaded media',
			},
			{
				displayName: 'Media ID',
				name: 'mediaIdSimple',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['getMediaUrl', 'downloadMedia', 'deleteMedia'],
					},
				},
				default: '',
				required: true,
				description: 'ID of the media to retrieve/download/delete',
			},

			// ========================================
			// UPLOAD SESSION FIELDS
			// ========================================
			{
				displayName: 'App ID',
				name: 'appId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['createUploadSession'],
					},
				},
				default: '',
				required: true,
				description: 'Facebook App ID',
			},
			{
				displayName: 'File Name',
				name: 'fileName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['createUploadSession'],
					},
				},
				default: '',
				required: true,
				description: 'Name of the file to upload',
			},
			{
				displayName: 'File Length',
				name: 'fileLength',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['createUploadSession'],
					},
				},
				default: 0,
				required: true,
				description: 'File size in bytes',
			},
			{
				displayName: 'File Type',
				name: 'fileType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['createUploadSession'],
					},
				},
				options: [
					{ name: 'PDF', value: 'application/pdf' },
					{ name: 'JPEG', value: 'image/jpeg' },
					{ name: 'JPG', value: 'image/jpg' },
					{ name: 'PNG', value: 'image/png' },
					{ name: 'MP4', value: 'video/mp4' },
				],
				default: 'application/pdf',
				required: true,
				description: 'MIME type of the file',
			},
			{
				displayName: 'Upload Session ID',
				name: 'uploadSessionId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['uploadFileToSession', 'getUploadSession'],
					},
				},
				default: '',
				required: true,
				description: 'ID of the upload session',
			},
			{
				displayName: 'File Binary Property',
				name: 'fileBinaryProperty',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['uploadFileToSession'],
					},
				},
				default: 'data',
				required: true,
				description: 'Name of binary property containing file data',
			},
			{
				displayName: 'File Offset',
				name: 'fileOffset',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['uploadFileToSession'],
					},
				},
				default: 0,
				description: 'Byte offset to resume upload (use Get Upload Session to get current offset)',
			},

			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				typeOptions: {
					rows: 2,
				},
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['sendImage', 'sendVideo', 'sendDocument'],
					},
				},
				default: '',
				description: 'Optional caption for the media (max 1024 characters)',
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
				description: 'Filename to display for the document',
			},
			{
				displayName: 'Binary Property',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['uploadMedia'],
					},
				},
				description: 'Name of the binary property containing the file to upload',
			},

			// ========================================
			// TEMPLATE FIELDS
			// ========================================
			{
				displayName: 'Template Name',
				name: 'templateName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['sendTemplate', 'deleteTemplate'],
					},
				},
				default: '',
				required: true,
				description: 'Name of the template',
			},
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['getTemplate'],
					},
				},
				default: '',
				required: true,
				description: 'ID of the template',
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
				description: 'Language code of the template (e.g., en, ar, en_US)',
			},
			{
				displayName: 'Components',
				name: 'templateComponents',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['sendTemplate'],
					},
				},
				default: {},
				options: [
					{
						name: 'componentValues',
						displayName: 'Component',
						values: [
							{
								displayName: 'Component Type',
								name: 'type',
								type: 'options',
								options: [
									{ name: 'Header', value: 'header' },
									{ name: 'Body', value: 'body' },
									{ name: 'Button', value: 'button' },
								],
								default: 'body',
							},
							{
								displayName: 'Sub Type (for buttons)',
								name: 'subType',
								type: 'options',
								displayOptions: {
									show: {
										type: ['button'],
									},
								},
								options: [
									{ name: 'Quick Reply', value: 'quick_reply' },
									{ name: 'URL', value: 'url' },
								],
								default: 'quick_reply',
							},
							{
								displayName: 'Button Index',
								name: 'index',
								type: 'number',
								displayOptions: {
									show: {
										type: ['button'],
									},
								},
								default: 0,
								description: 'Position index of the button (0-indexed)',
							},
							{
								displayName: 'Parameters',
								name: 'parameters',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										name: 'parameterValues',
										displayName: 'Parameter',
										values: [
											{
												displayName: 'Type',
												name: 'type',
												type: 'options',
												options: [
													{ name: 'Text', value: 'text' },
													{ name: 'Image', value: 'image' },
													{ name: 'Video', value: 'video' },
													{ name: 'Document', value: 'document' },
													{ name: 'Payload', value: 'payload' },
												],
												default: 'text',
											},
											{
												displayName: 'Value',
												name: 'value',
												type: 'string',
												default: '',
												description: 'Parameter value (text content, URL, or media ID)',
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				displayName: 'Template Category',
				name: 'templateCategory',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['createTemplate'],
					},
				},
				options: [
					{ name: 'Marketing', value: 'MARKETING' },
					{ name: 'Utility', value: 'UTILITY' },
					{ name: 'Authentication', value: 'AUTHENTICATION' },
				],
				default: 'MARKETING',
			},
			{
				displayName: 'Template JSON',
				name: 'templateJson',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['createTemplate', 'updateTemplate'],
					},
				},
				default: '{}',
				description: 'Complete template definition in JSON format',
			},
			{
				displayName: 'Template ID',
				name: 'updateTemplateId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['updateTemplate'],
					},
				},
				default: '',
				required: true,
				description: 'ID of the template to update',
			},
			{
				displayName: 'Template ID',
				name: 'unpauseTemplateId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['unpauseTemplate'],
					},
				},
				default: '',
				required: true,
				description: 'ID of the template to unpause',
			},
			{
				displayName: 'Template IDs',
				name: 'compareTemplateIds',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['compareTemplates'],
					},
				},
				default: '',
				required: true,
				description: 'Two template IDs separated by comma (e.g., 123456,789012)',
			},
			{
				displayName: 'Start Date',
				name: 'compareStartDate',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['compareTemplates'],
					},
				},
				default: '',
				required: true,
				description: 'Start date for comparison period',
			},
			{
				displayName: 'End Date',
				name: 'compareEndDate',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['compareTemplates'],
					},
				},
				default: '',
				required: true,
				description: 'End date for comparison period',
			},
			{
				displayName: 'Source WABA ID',
				name: 'sourceWabaId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['migrateTemplates'],
					},
				},
				default: '',
				required: true,
				description: 'Source WhatsApp Business Account ID',
			},
			{
				displayName: 'Page Number',
				name: 'migratePageNumber',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['migrateTemplates'],
					},
				},
				default: 0,
				description: 'Page number for migrating templates in sets of 500 (0-indexed)',
			},

			// ========================================
			// BUSINESS PROFILE FIELDS
			// ========================================
			{
				displayName: 'About',
				name: 'about',
				type: 'string',
				typeOptions: {
					rows: 2,
				},
				displayOptions: {
					show: {
						resource: ['businessProfile'],
						operation: ['updateProfile'],
					},
				},
				default: '',
				description: 'About text for the business (max 139 characters)',
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['businessProfile'],
						operation: ['updateProfile'],
					},
				},
				default: '',
				description: 'Business address (max 256 characters)',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				displayOptions: {
					show: {
						resource: ['businessProfile'],
						operation: ['updateProfile'],
					},
				},
				default: '',
				description: 'Business description (max 512 characters)',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['businessProfile'],
						operation: ['updateProfile'],
					},
				},
				default: '',
				description: 'Business email address',
			},
			{
				displayName: 'Industry',
				name: 'vertical',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['businessProfile'],
						operation: ['updateProfile'],
					},
				},
				options: [
					{ name: 'Automotive', value: 'AUTO' },
					{ name: 'Beauty', value: 'BEAUTY' },
					{ name: 'Apparel', value: 'APPAREL' },
					{ name: 'Education', value: 'EDU' },
					{ name: 'Entertainment', value: 'ENTERTAIN' },
					{ name: 'Event Planning', value: 'EVENT_PLAN' },
					{ name: 'Finance', value: 'FINANCE' },
					{ name: 'Grocery', value: 'GROCERY' },
					{ name: 'Government', value: 'GOVT' },
					{ name: 'Hotel', value: 'HOTEL' },
					{ name: 'Health', value: 'HEALTH' },
					{ name: 'Non-Profit', value: 'NONPROFIT' },
					{ name: 'Professional Services', value: 'PROF_SERVICES' },
					{ name: 'Retail', value: 'RETAIL' },
					{ name: 'Travel', value: 'TRAVEL' },
					{ name: 'Restaurant', value: 'RESTAURANT' },
					{ name: 'Other', value: 'OTHER' },
				],
				default: 'OTHER',
			},

			// ========================================
			// MARKETING MESSAGE FIELDS
			// ========================================
			{
				displayName: 'Marketing Template',
				name: 'marketingTemplate',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMarketingMessage'],
					},
				},
				default: '{\n  "name": "template_name",\n  "language": {"code": "en"},\n  "components": []\n}',
				required: true,
				description: 'Marketing template object (name, language, components)',
			},
			{
				displayName: 'Message Activity Sharing',
				name: 'messageActivitySharing',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMarketingMessage'],
					},
				},
				default: false,
				description: 'Whether to share message activity status',
			},
			{
				displayName: 'Callback Data',
				name: 'bizOpaqueCallbackData',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMarketingMessage'],
					},
				},
				default: '',
				description: 'Custom callback data (max 512 characters)',
			},
			{
				displayName: 'Recipient Identity Key Hash',
				name: 'recipientIdentityKeyHash',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMarketingMessage'],
					},
				},
				default: '',
				description: 'Optional recipient identity key hash for verification',
			},
			{
				displayName: 'HTTP Method',
				name: 'rawMethod',
				type: 'options',
				options: [
					{ name: 'GET', value: 'GET' },
					{ name: 'POST', value: 'POST' },
					{ name: 'DELETE', value: 'DELETE' },
					{ name: 'PATCH', value: 'PATCH' },
					{ name: 'PUT', value: 'PUT' },
				],
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendRawRequest'],
					},
				},
				default: 'POST',
				required: true,
				description: 'HTTP method for the request',
			},
			{
				displayName: 'Endpoint',
				name: 'rawEndpoint',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendRawRequest'],
					},
				},
				default: '',
				required: true,
				description: 'API endpoint (e.g., /{phone_id}/messages)',
			},
			{
				displayName: 'Request Body (JSON)',
				name: 'rawBody',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendRawRequest'],
					},
				},
				default: '{}',
				description: 'Request body as JSON',
			},
			{
				displayName: 'HTTP Method',
				name: 'rawMethod',
				type: 'options',
				options: [
					{ name: 'GET', value: 'GET' },
					{ name: 'POST', value: 'POST' },
					{ name: 'DELETE', value: 'DELETE' },
					{ name: 'PATCH', value: 'PATCH' },
					{ name: 'PUT', value: 'PUT' },
				],
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendRawRequest'],
					},
				},
				default: 'POST',
				required: true,
				description: 'HTTP method for the request',
			},
			{
				displayName: 'Endpoint',
				name: 'rawEndpoint',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendRawRequest'],
					},
				},
				default: '',
				required: true,
				description: 'API endpoint (e.g., /{phone_id}/messages)',
			},
			{
				displayName: 'Request Body (JSON)',
				name: 'rawBody',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendRawRequest'],
					},
				},
				default: '{}',
				description: 'Request body as JSON',
			},
			{
				displayName: 'Websites',
				name: 'websites',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['businessProfile'],
						operation: ['updateProfile'],
					},
				},
				default: '',
				description: 'Website URLs (comma-separated, max 2)',
			},
			{
				displayName: 'Callback URL',
				name: 'callbackUrl',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['businessProfile'],
						operation: ['setWebhookUrl'],
					},
				},
				default: '',
				required: true,
				description: 'Alternate callback URL for WABA webhooks',
			},
			{
				displayName: 'Verify Token',
				name: 'verifyToken',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['businessProfile'],
						operation: ['setWebhookUrl'],
					},
				},
				default: '',
				required: true,
				description: 'Verify token for webhook validation',
			},

			// ========================================
			// PHONE NUMBER FIELDS
			// ========================================
			{
				displayName: 'Callback URL',
				name: 'phoneCallbackUrl',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['phoneNumber'],
						operation: ['setPhoneWebhookUrl'],
					},
				},
				default: '',
				required: true,
				description: 'Alternate callback URL for phone webhooks',
			},
			{
				displayName: 'Verify Token',
				name: 'phoneVerifyToken',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['phoneNumber'],
						operation: ['setPhoneWebhookUrl'],
					},
				},
				default: '',
				required: true,
				description: 'Verify token for webhook validation',
			},

			// ========================================
			// CONVERSATIONAL AUTOMATION FIELDS
			// ========================================
			{
				displayName: 'Enable Welcome Message',
				name: 'enableWelcomeMessage',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['phoneNumber'],
						operation: ['updateConversationalAutomation'],
					},
				},
				default: false,
				description: 'Whether to enable welcome message',
			},
			{
				displayName: 'Prompts (Ice Breakers)',
				name: 'prompts',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['phoneNumber'],
						operation: ['updateConversationalAutomation'],
					},
				},
				default: '',
				description: 'JSON array of ice breaker prompts',
				placeholder: '[{"id":"1","text":"Help me get started"}]',
			},
			{
				displayName: 'Commands',
				name: 'commands',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['phoneNumber'],
						operation: ['updateConversationalAutomation'],
					},
				},
				default: '',
				description: 'Commands configuration string',
			},

			{
				displayName: 'PIN',
				name: 'pin',
				type: 'string',
				typeOptions: {
					password: true,
				},
				displayOptions: {
					show: {
						resource: ['phoneNumber'],
						operation: ['registerPhone'],
					},
				},
				default: '',
				required: true,
				description: 'Six-digit PIN for two-step verification',
			},

			// ========================================
			// FLOW FIELDS
			// ========================================
			{
				displayName: 'Flow ID',
				name: 'flowId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['getFlow', 'updateFlow', 'updateFlowJson', 'publishFlow', 'deprecateFlow', 'deleteFlow'],
					},
				},
				default: '',
				required: true,
				description: 'ID of the flow',
			},
			{
				displayName: 'Flow Name',
				name: 'flowName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['createFlow', 'updateFlow'],
					},
				},
				default: '',
				required: true,
				description: 'Name of the flow',
			},
			{
				displayName: 'Flow Categories',
				name: 'flowCategories',
				type: 'multiOptions',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['createFlow'],
					},
				},
				options: [
					{ name: 'Sign Up', value: 'SIGN_UP' },
					{ name: 'Sign In', value: 'SIGN_IN' },
					{ name: 'Appointment Booking', value: 'APPOINTMENT_BOOKING' },
					{ name: 'Lead Generation', value: 'LEAD_GENERATION' },
					{ name: 'Contact Us', value: 'CONTACT_US' },
					{ name: 'Customer Support', value: 'CUSTOMER_SUPPORT' },
					{ name: 'Survey', value: 'SURVEY' },
					{ name: 'Other', value: 'OTHER' },
				],
				default: ['OTHER'],
			},
			{
				displayName: 'Flow JSON',
				name: 'flowJson',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['updateFlowJson'],
					},
				},
				default: '{}',
				required: true,
				description: 'Complete flow JSON definition',
			},
			{
				displayName: 'Flow ID',
				name: 'metricsFlowId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['getFlowMetrics'],
					},
				},
				default: '',
				required: true,
				description: 'Flow ID to get metrics for',
			},
			{
				displayName: 'Metric Name',
				name: 'metricName',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['getFlowMetrics'],
					},
				},
				options: [
					{ name: 'Opens', value: 'FLOW_OPENS' },
					{ name: 'Completions', value: 'FLOW_COMPLETIONS' },
					{ name: 'Errors', value: 'FLOW_ERRORS' },
				],
				default: 'FLOW_OPENS',
				required: true,
				description: 'Type of metric to retrieve',
			},
			{
				displayName: 'Granularity',
				name: 'granularity',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['getFlowMetrics'],
					},
				},
				options: [
					{ name: 'Daily', value: 'DAILY' },
					{ name: 'Weekly', value: 'WEEKLY' },
					{ name: 'Monthly', value: 'MONTHLY' },
				],
				default: 'DAILY',
				required: true,
				description: 'Granularity of metrics',
			},
			{
				displayName: 'Since Date',
				name: 'sinceDate',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['getFlowMetrics'],
					},
				},
				default: '',
				description: 'Start date for metrics',
			},
			{
				displayName: 'Until Date',
				name: 'untilDate',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['getFlowMetrics'],
					},
				},
				default: '',
				description: 'End date for metrics',
			},
			{
				displayName: 'Flow ID',
				name: 'assetsFlowId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['getFlowAssets'],
					},
				},
				default: '',
				required: true,
				description: 'Flow ID to get assets for',
			},
			{
				displayName: 'Source WABA ID',
				name: 'sourceFlowWabaId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['migrateFlows'],
					},
				},
				default: '',
				required: true,
				description: 'Source WhatsApp Business Account ID',
			},
			{
				displayName: 'Flow Names',
				name: 'sourceFlowNames',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['migrateFlows'],
					},
				},
				default: '',
				required: true,
				description: 'Comma-separated list of flow names to migrate',
			},
			{
				displayName: 'Flow ID',
				name: 'exchangeFlowId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['exchangeData'],
					},
				},
				default: '',
				required: true,
				description: 'Flow ID to exchange data with',
			},
			{
				displayName: 'Data',
				name: 'exchangeData',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['exchangeData'],
					},
				},
				default: '{}',
				required: true,
				description: 'JSON data to send to the Flow',
			},
			{
				displayName: 'Send Message After Exchange',
				name: 'sendAfterExchange',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['exchangeData'],
					},
				},
				default: true,
				description: 'Whether to automatically send a Flow message after data exchange',
			},
			{
				displayName: 'Recipient Phone',
				name: 'exchangeRecipient',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['exchangeData'],
						sendAfterExchange: [true],
					},
				},
				default: '',
				required: true,
				description: 'Phone number to send the Flow message to (without +)',
			},
			{
				displayName: 'Body Text',
				name: 'exchangeBodyText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['exchangeData'],
						sendAfterExchange: [true],
					},
				},
				default: 'Please complete this form',
				required: true,
				description: 'Body text for the Flow message',
			},
			{
				displayName: 'Flow CTA',
				name: 'exchangeFlowCta',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['exchangeData'],
						sendAfterExchange: [true],
					},
				},
				default: 'Open',
				required: true,
				description: 'Call-to-action button text (max 20 characters)',
			},
			{
				displayName: 'Header Text',
				name: 'exchangeHeaderText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['exchangeData'],
						sendAfterExchange: [true],
					},
				},
				default: '',
				description: 'Optional header text',
			},
			{
				displayName: 'Footer Text',
				name: 'exchangeFooterText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['exchangeData'],
						sendAfterExchange: [true],
					},
				},
				default: '',
				description: 'Optional footer text',
			},

			{
				displayName: 'Template Config (JSON)',
				name: 'templateConfig',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['generateFlowTemplate'],
					},
				},
				default: '{"screens":[{"id":"WELCOME","title":"Welcome","data":{},"layout":{"type":"SingleColumnLayout","children":[{"type":"Form","name":"form","children":[{"type":"TextHeading","text":"Welcome"},{"type":"TextInput","name":"user_name","label":"Name","required":true},{"type":"Footer","label":"Continue","on-click-action":{"name":"data_exchange","payload":{"user_name":"${form.user_name}"}}}]}]}}]}',
				description: 'Flow template with screens and data-exchange actions',
			}, {
				displayName: 'Template Configuration (JSON)',
				name: 'templateConfig',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['flow'],
						operation: ['generateFlowTemplate'],
					},
				},
				default: `{
  "screens": [
    {
      "id": "WELCOME",
      "title": "Welcome",
      "data": {},
      "layout": {
        "type": "SingleColumnLayout",
        "children": [
          {
            "type": "Form",
            "name": "form",
            "children": [
              {
                "type": "TextHeading",
                "text": "Welcome to our service"
              },
              {
                "type": "TextInput",
                "name": "user_name",
                "label": "Your Name",
                "required": true
              },
              {
                "type": "Footer",
                "label": "Continue",
                "on-click-action": {
                  "name": "data_exchange",
                  "payload": {
                    "user_name": "\${form.user_name}"
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ]
}`,
				description: 'Flow template configuration with screens, components, and data-exchange actions',
			},
			// ========================================
			// CALL FIELDS
			// ========================================
			{
				displayName: 'To',
				name: 'callTo',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['initiateCall'],
					},
				},
				default: '',
				required: true,
				description: 'Phone number to call',
			},
			{
				displayName: 'SDP Offer',
				name: 'sdpOffer',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['initiateCall'],
					},
				},
				default: '{}',
				required: true,
				description: 'Session Description Protocol offer',
			},
			{
				displayName: 'Call ID',
				name: 'callId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['preAcceptCall', 'acceptCall', 'rejectCall', 'terminateCall'],
					},
				},
				default: '',
				required: true,
				description: 'ID of the call',
			},
			{
				displayName: 'SDP (Pre-Accept)',
				name: 'sdpPreAccept',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['preAcceptCall'],
					},
				},
				default: '',
				description: 'Optional SDP info (RFC 8866)',
			},
			{
				displayName: 'SDP Answer',
				name: 'sdpAnswer',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['acceptCall'],
					},
				},
				default: '',
				description: 'Optional SDP answer',
			},
			{
				displayName: 'Callback Data',
				name: 'callbackData',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['acceptCall'],
					},
				},
				default: '',
				description: 'Optional callback data (max 512 chars)',
			},

			// ========================================
			// CONVERSATIONAL AUTOMATION FIELDS
			// ========================================
			{
				displayName: 'Automation JSON',
				name: 'automationJson',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['businessProfile'],
						operation: ['updateConversationalAutomation'],
					},
				},
				default: '{"commands": [], "prompts": []}',
				description: 'Commands and ice breakers configuration',
			},

			// ========================================
			// COMMERCE SETTINGS FIELDS
			// ========================================
			{
				displayName: 'Commerce Settings JSON',
				name: 'commerceSettingsJson',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['businessProfile'],
						operation: ['updateCommerceSettings'],
					},
				},
				default: '{}',
				description: 'Commerce settings configuration',
			},

			// ========================================
			// SYSTEM FIELDS
			// ========================================
			{
				displayName: 'App ID',
				name: 'systemAppId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['getAppAccessToken'],
					},
				},
				default: '',
				required: true,
				description: 'Facebook App ID',
			},
			{
				displayName: 'App Secret',
				name: 'appSecret',
				type: 'string',
				typeOptions: {
					password: true,
				},
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['getAppAccessToken'],
					},
				},
				default: '',
				required: true,
				description: 'Facebook App Secret',
			},
			{
				displayName: 'App Access Token',
				name: 'appAccessToken',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['setAppCallbackUrl'],
					},
				},
				default: '',
				required: true,
				description: 'App access token from getAppAccessToken',
			},
			{
				displayName: 'Callback URL',
				name: 'systemCallbackUrl',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['setAppCallbackUrl'],
					},
				},
				default: '',
				required: true,
				description: 'Webhook callback URL',
			},
			{
				displayName: 'Verify Token',
				name: 'systemVerifyToken',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['setAppCallbackUrl'],
					},
				},
				default: '',
				required: true,
				description: 'Webhook verify token',
			},
			{
				displayName: 'Subscription Fields',
				name: 'subscriptionFields',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['setAppCallbackUrl'],
					},
				},
				default: 'messages,message_echoes',
				required: true,
				description: 'Comma-separated list of fields to subscribe to',
			},

			// ========================================
			// QR CODE FIELDS
			// ========================================
			{
				displayName: 'QR Code',
				name: 'qrCode',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['qrCode'],
						operation: ['getQrCode', 'updateQrCode', 'deleteQrCode'],
					},
				},
				default: '',
				required: true,
				description: 'Code identifier of the QR code',
			},
			{
				displayName: 'Prefilled Message',
				name: 'prefilledMessage',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['qrCode'],
						operation: ['createQrCode', 'updateQrCode'],
					},
				},
				default: '',
				required: true,
				description: 'Pre-filled message that appears when QR code is scanned',
			},
			{
				displayName: 'Image Format',
				name: 'imageFormat',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['qrCode'],
						operation: ['createQrCode'],
					},
				},
				options: [
					{ name: 'PNG', value: 'PNG' },
					{ name: 'SVG', value: 'SVG' },
				],
				default: 'PNG',
			},

			// ========================================
			// ADDITIONAL OPTIONS
			// ========================================
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['message', 'media', 'template'],
						operation: [
							'sendText',
							'sendInteractiveButtons',
							'sendInteractiveList',
							'sendFlow',
							'sendLocation',
							'requestLocation',
							'sendContact',
							'sendCatalog',
							'sendProduct',
							'sendProducts',
							'sendImage',
							'sendVideo',
							'sendAudio',
							'sendVoice',
							'sendDocument',
							'sendSticker',
							'sendTemplate',
						],
					},
				},
				options: [
					{
						displayName: 'Reply To Message ID',
						name: 'replyToMessageId',
						type: 'string',
						default: '',
						description: 'Message ID to reply to (creates a quoted reply)',
					},
					{
						displayName: 'Tracking Data',
						name: 'trackingData',
						type: 'string',
						default: '',
						description: 'Custom tracking data that will be returned in webhooks',
					},
				],
			}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('bcdrllcApi');

		const apiVersion = credentials.apiVersion || 'v24.0';
		const phoneNumberId = credentials.phoneNumberId;
		const businessAccountId = credentials.businessAccountId;
		const baseUrl = `https://graph.facebook.com/${apiVersion}`;

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData: any;

				// ========================================
				// MESSAGE RESOURCE
				// ========================================
				if (resource === 'message') {
					const to = this.getNodeParameter('to', i) as string;
					const options = this.getNodeParameter('options', i, {}) as {
						replyToMessageId?: string;
						trackingData?: string;
					};

					let body: any = {
						messaging_product: 'whatsapp',
						recipient_type: 'individual',
						to: to,
					};

					if (options.replyToMessageId) {
						body.context = { message_id: options.replyToMessageId };
					}
					if (options.trackingData) {
						body.biz_opaque_callback_data = options.trackingData;
					}

					if (operation === 'sendText') {
						const message = this.getNodeParameter('message', i) as string;
						const previewUrl = this.getNodeParameter('previewUrl', i) as boolean;

						body.type = 'text';
						body.text = {
							preview_url: previewUrl,
							body: message,
						};
					} else if (operation === 'sendInteractiveButtons') {
						const bodyText = this.getNodeParameter('bodyText', i) as string;
						const buttonsData = this.getNodeParameter('buttons', i, {}) as {
							buttonValues?: Array<{ id: string; title: string }>;
						};
						const headerText = this.getNodeParameter('headerText', i, '') as string;
						const footerText = this.getNodeParameter('footerText', i, '') as string;

						const buttons = (buttonsData.buttonValues || []).map((btn) => ({
							type: 'reply',
							reply: {
								id: btn.id,
								title: btn.title,
							},
						}));

						body.type = 'interactive';
						body.interactive = {
							type: 'button',
							body: { text: bodyText },
							action: { buttons },
						};

						if (headerText) {
							body.interactive.header = { type: 'text', text: headerText };
						}
						if (footerText) {
							body.interactive.footer = { text: footerText };
						}
					} else if (operation === 'sendInteractiveList') {
						const bodyText = this.getNodeParameter('bodyText', i) as string;
						const buttonText = this.getNodeParameter('buttonText', i) as string;
						const sectionsData = this.getNodeParameter('sections', i, {}) as {
							sectionValues?: Array<{
								title: string;
								rows: {
									rowValues?: Array<{ id: string; title: string; description?: string }>;
								};
							}>;
						};
						const headerText = this.getNodeParameter('headerText', i, '') as string;
						const footerText = this.getNodeParameter('footerText', i, '') as string;

						const sections = (sectionsData.sectionValues || []).map((section) => ({
							title: section.title,
							rows: (section.rows?.rowValues || []).map((row) => ({
								id: row.id,
								title: row.title,
								description: row.description || undefined,
							})),
						}));

						body.type = 'interactive';
						body.interactive = {
							type: 'list',
							body: { text: bodyText },
							action: {
								button: buttonText,
								sections,
							},
						};

						if (headerText) {
							body.interactive.header = { type: 'text', text: headerText };
						}
						if (footerText) {
							body.interactive.footer = { text: footerText };
						}
					} else if (operation === 'sendFlow') {
						const flowId = this.getNodeParameter('flowId', i) as string;
						const flowAction = this.getNodeParameter('flowAction', i) as string;
						const flowActionPayloadStr = this.getNodeParameter('flowActionPayload', i) as string;
						const bodyText = this.getNodeParameter('bodyText', i) as string;
						const flowCta = this.getNodeParameter('flowCta', i) as string;
						const flowMode = this.getNodeParameter('flowMode', i, 'published') as string;
						const headerText = this.getNodeParameter('headerText', i, '') as string;
						const footerText = this.getNodeParameter('footerText', i, '') as string;

						let flowActionPayload;
						try {
							flowActionPayload = JSON.parse(flowActionPayloadStr);
						} catch (error) {
							const errorMessage = error instanceof Error ? error.message : 'Unknown error';
							throw new NodeOperationError(
								this.getNode(),
								`Invalid JSON in Flow Action Payload: ${errorMessage}`,
								{ itemIndex: i }
							);
						}

						body.type = 'interactive';
						body.interactive = {
							type: 'flow',
							body: { text: bodyText },
							action: {
								name: 'flow',
								parameters: {
									flow_message_version: '3',
									flow_token: flowId,
									flow_id: flowId,
									flow_cta: flowCta,
									flow_action: flowAction,
									flow_action_payload: flowActionPayload,
									mode: flowMode,
								},
							},
						};

						if (headerText) {
							body.interactive.header = { type: 'text', text: headerText };
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
							...(locationName && { name: locationName }),
							...(locationAddress && { address: locationAddress }),
						};
					} else if (operation === 'sendContact') {
						const contactsData = this.getNodeParameter('contacts', i, {}) as {
							contactValues?: Array<{
								firstName: string;
								lastName?: string;
								phone: string;
								email?: string;
								company?: string;
							}>;
						};

						const contacts = (contactsData.contactValues || []).map((contact) => ({
							name: {
								formatted_name: `${contact.firstName}${contact.lastName ? ' ' + contact.lastName : ''}`,
								first_name: contact.firstName,
								...(contact.lastName && { last_name: contact.lastName }),
							},
							phones: [
								{
									phone: contact.phone,
									type: 'MOBILE',
								},
							],
							...(contact.email && {
								emails: [{ email: contact.email, type: 'WORK' }],
							}),
							...(contact.company && {
								org: { company: contact.company },
							}),
						}));

						body.type = 'contacts';
						body.contacts = contacts;
					} else if (operation === 'sendReaction') {
						const messageId = this.getNodeParameter('messageId', i) as string;
						const emoji = this.getNodeParameter('emoji', i) as string;

						body.type = 'reaction';
						body.reaction = {
							message_id: messageId,
							emoji: emoji,
						};
					} else if (operation === 'sendRawRequest') {
						const method = this.getNodeParameter('rawMethod', i) as string;
						const endpoint = this.getNodeParameter('rawEndpoint', i) as string;
						const bodyJson = this.getNodeParameter('rawBody', i, '{}') as string;
						const requestBody = JSON.parse(bodyJson);

						const requestOptions: any = {
							method,
							url: `${baseUrl}${endpoint}`,
							json: true,
						};

						if (Object.keys(requestBody).length > 0 && method !== 'GET') {
							requestOptions.body = requestBody;
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							requestOptions,
						);
					} else if (operation === 'sendRawRequest') {
						const method = this.getNodeParameter('rawMethod', i) as string;
						const endpoint = this.getNodeParameter('rawEndpoint', i) as string;
						const bodyJson = this.getNodeParameter('rawBody', i, '{}') as string;
						const requestBody = JSON.parse(bodyJson);

						const requestOptions: any = {
							method,
							url: `${baseUrl}${endpoint}`,
							json: true,
						};

						if (Object.keys(requestBody).length > 0 && method !== 'GET') {
							requestOptions.body = requestBody;
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							requestOptions,
						);
					} else if (operation === 'markAsRead') {
						const messageId = this.getNodeParameter('messageId', i) as string;

						body = {
							messaging_product: 'whatsapp',
							status: 'read',
							message_id: messageId,
						};
					} else if (operation === 'setTypingIndicator') {
						const messageId = this.getNodeParameter('messageId', i) as string;

						body = {
							messaging_product: 'whatsapp',
							status: 'read',
							message_id: messageId,
							typing_indicator: {
								type: 'text',
							},
						};
					} else if (operation === 'sendMarketingMessage') {
						const marketingTemplate = this.getNodeParameter('marketingTemplate', i) as string;
						const messageActivitySharing = this.getNodeParameter('messageActivitySharing', i, false) as boolean;
						const bizOpaqueCallbackData = this.getNodeParameter('bizOpaqueCallbackData', i, '') as string;
						const recipientIdentityKeyHash = this.getNodeParameter('recipientIdentityKeyHash', i, '') as string;

						body.recipient_type = 'individual';
						body.type = 'template';
						body.template = JSON.parse(marketingTemplate);

						if (messageActivitySharing) {
							body.message_activity_sharing = { enabled: true };
						}
						if (bizOpaqueCallbackData) {
							body.biz_opaque_callback_data = bizOpaqueCallbackData;
						}
						if (recipientIdentityKeyHash) {
							body.recipient_identity_key_hash = recipientIdentityKeyHash;
						}

						// Marketing messages use different endpoint - make request immediately
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/marketing_messages`,
								body,
								json: true,
							},
						);
						// Skip the normal message sending below
						returnData.push({ json: responseData });
						continue;
					} else if (operation === 'requestLocation') {
						const requestLocationBody = this.getNodeParameter('requestLocationBody', i) as string;

						body.type = 'interactive';
						body.interactive = {
							type: 'location_request_message',
							body: { text: requestLocationBody },
							action: { name: 'send_location' },
						};
					} else if (operation === 'sendCatalog') {
						const catalogBody = this.getNodeParameter('catalogBody', i, '') as string;

						body.type = 'interactive';
						body.interactive = {
							type: 'catalog_message',
							body: { text: catalogBody },
							action: { name: 'catalog_message' },
						};
					} else if (operation === 'sendProduct') {
						const productRetailerId = this.getNodeParameter('productRetailerId', i) as string;
						const catalogId = this.getNodeParameter('catalogId', i) as string;
						const productBody = this.getNodeParameter('productBody', i, '') as string;

						body.type = 'interactive';
						body.interactive = {
							type: 'product',
							body: { text: productBody },
							action: {
								catalog_id: catalogId,
								product_retailer_id: productRetailerId,
							},
						};
					} else if (operation === 'sendProducts') {
						const productsHeader = this.getNodeParameter('productsHeader', i) as string;
						const productItemsData = this.getNodeParameter('productItems', i, {}) as {
							itemValues?: Array<{ productRetailerId: string }>;
						};
						const catalogIdProducts = this.getNodeParameter('catalogIdProducts', i) as string;
						const productBody = this.getNodeParameter('productBody', i, '') as string;

						const sections = [
							{
								product_items: (productItemsData.itemValues || []).map((item) => ({
									product_retailer_id: item.productRetailerId,
								})),
							},
						];

						body.type = 'interactive';
						body.interactive = {
							type: 'product_list',
							header: { type: 'text', text: productsHeader },
							body: { text: productBody },
							action: {
								catalog_id: catalogIdProducts,
								sections,
							},
						};
					} else if (operation === 'removeReaction') {
						const messageId = this.getNodeParameter('messageId', i) as string;

						body.type = 'reaction';
						body.reaction = {
							message_id: messageId,
							emoji: '',
						};
					}

					responseData = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'bcdrllcApi',
						{
							method: 'POST',
							url: `${baseUrl}/${phoneNumberId}/messages`,
							body,
							json: true,
						},
					);
				}

				// ========================================
				// MEDIA RESOURCE
				// ========================================
				else if (resource === 'media') {
					if (['sendImage', 'sendVideo', 'sendAudio', 'sendVoice', 'sendDocument', 'sendSticker'].includes(operation)) {
						const to = this.getNodeParameter('to', i) as string;
						const mediaSource = this.getNodeParameter('mediaSource', i) as string;
						const options = this.getNodeParameter('options', i, {}) as {
							replyToMessageId?: string;
							trackingData?: string;
						};

						let mediaObj: any = {};
						if (mediaSource === 'url') {
							const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;
							mediaObj.link = mediaUrl;
						} else {
							const mediaId = this.getNodeParameter('mediaId', i) as string;
							mediaObj.id = mediaId;
						}

						const body: any = {
							messaging_product: 'whatsapp',
							recipient_type: 'individual',
							to,
						};

						if (options.replyToMessageId) {
							body.context = { message_id: options.replyToMessageId };
						}
						if (options.trackingData) {
							body.biz_opaque_callback_data = options.trackingData;
						}

						const mediaType = operation.replace('send', '').toLowerCase();
						body.type = mediaType;

						if (['sendImage', 'sendVideo', 'sendDocument'].includes(operation)) {
							const caption = this.getNodeParameter('caption', i, '') as string;
							if (caption) mediaObj.caption = caption;
						}

						if (operation === 'sendDocument') {
							const filename = this.getNodeParameter('filename', i, '') as string;
							if (filename) mediaObj.filename = filename;
						}

						body[mediaType] = mediaObj;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/messages`,
								body,
								json: true,
							},
						);
					} else if (operation === 'uploadMedia') {
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
						const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);

						const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/media`,
								body: {
									messaging_product: 'whatsapp',
									type: binaryData.mimeType,
									file: {
										value: buffer,
										options: {
											filename: binaryData.fileName || 'file',
											contentType: binaryData.mimeType,
										},
									},
								},
								json: true,
							},
						);
					} else if (operation === 'getMediaUrl') {
						const mediaId = this.getNodeParameter('mediaIdSimple', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${mediaId}`,
								json: true,
							},
						);
					} else if (operation === 'downloadMedia') {
						const mediaId = this.getNodeParameter('mediaIdSimple', i) as string;

						// First get the media URL
						const mediaUrlResponse = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${mediaId}`,
								json: true,
							},
						);

						// Then download the media file
						const downloadUrl = mediaUrlResponse.url;
						const binaryData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: downloadUrl,
								encoding: 'arraybuffer',
							},
						);

						responseData = {
							mediaId,
							url: downloadUrl,
							binaryData: Buffer.from(binaryData as ArrayBuffer).toString('base64'),
						};
					} else if (operation === 'deleteMedia') {
						const mediaId = this.getNodeParameter('mediaIdSimple', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/${mediaId}`,
								json: true,
							},
						);
					} else if (operation === 'createUploadSession') {
						const appId = this.getNodeParameter('appId', i) as string;
						const fileName = this.getNodeParameter('fileName', i) as string;
						const fileLength = this.getNodeParameter('fileLength', i) as number;
						const fileType = this.getNodeParameter('fileType', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${appId}/uploads?file_name=${encodeURIComponent(fileName)}&file_length=${fileLength}&file_type=${encodeURIComponent(fileType)}`,
								json: true,
							},
						);
					} else if (operation === 'uploadFileToSession') {
						const uploadSessionId = this.getNodeParameter('uploadSessionId', i) as string;
						const fileBinaryProperty = this.getNodeParameter('fileBinaryProperty', i) as string;
						const fileOffset = this.getNodeParameter('fileOffset', i, 0) as number;

						const binaryData = this.helpers.assertBinaryData(i, fileBinaryProperty);
						const fileBuffer = await this.helpers.getBinaryDataBuffer(i, fileBinaryProperty);

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${uploadSessionId}`,
								headers: {
									'file_offset': String(fileOffset),
									'Content-Length': String(fileBuffer.length),
								},
								body: fileBuffer,
								json: true,
							},
						);
					} else if (operation === 'getUploadSession') {
						const uploadSessionId = this.getNodeParameter('uploadSessionId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${uploadSessionId}`,
								json: true,
							},
						);
					}
				}

				// ========================================
				// TEMPLATE RESOURCE
				// ========================================
				else if (resource === 'template') {
					if (operation === 'sendTemplate') {
						const to = this.getNodeParameter('to', i) as string;
						const templateName = this.getNodeParameter('templateName', i) as string;
						const languageCode = this.getNodeParameter('languageCode', i) as string;
						const componentsData = this.getNodeParameter('templateComponents', i, {}) as {
							componentValues?: Array<{
								type: string;
								subType?: string;
								index?: number;
								parameters: {
									parameterValues?: Array<{ type: string; value: string }>;
								};
							}>;
						};
						const options = this.getNodeParameter('options', i, {}) as {
							replyToMessageId?: string;
							trackingData?: string;
						};

						const components = (componentsData.componentValues || []).map((comp) => {
							const component: any = { type: comp.type };
							if (comp.type === 'button') {
								component.sub_type = comp.subType;
								component.index = comp.index?.toString() || '0';
							}
							component.parameters = (comp.parameters?.parameterValues || []).map((param) => {
								if (param.type === 'text' || param.type === 'payload') {
									return { type: param.type, [param.type]: param.value };
								} else {
									return { type: param.type, [param.type]: { link: param.value } };
								}
							});
							return component;
						});

						const body: any = {
							messaging_product: 'whatsapp',
							recipient_type: 'individual',
							to,
							type: 'template',
							template: {
								name: templateName,
								language: { code: languageCode },
								...(components.length > 0 && { components }),
							},
						};

						if (options.replyToMessageId) {
							body.context = { message_id: options.replyToMessageId };
						}
						if (options.trackingData) {
							body.biz_opaque_callback_data = options.trackingData;
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/messages`,
								body,
								json: true,
							},
						);
					} else if (operation === 'getTemplates') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${businessAccountId}/message_templates`,
								json: true,
							},
						);
					} else if (operation === 'getTemplate') {
						const templateId = this.getNodeParameter('templateId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${templateId}`,
								json: true,
							},
						);
					} else if (operation === 'createTemplate') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						const templateJson = this.getNodeParameter('templateJson', i) as string;
						const template = JSON.parse(templateJson);

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${businessAccountId}/message_templates`,
								body: template,
								json: true,
							},
						);
					} else if (operation === 'deleteTemplate') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						const templateName = this.getNodeParameter('templateName', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/${businessAccountId}/message_templates`,
								qs: { name: templateName },
								json: true,
							},
						);
					} else if (operation === 'updateTemplate') {
						const updateTemplateId = this.getNodeParameter('updateTemplateId', i) as string;
						const templateJson = this.getNodeParameter('templateJson', i) as string;
						const template = JSON.parse(templateJson);

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${updateTemplateId}`,
								body: template,
								json: true,
							},
						);
					} else if (operation === 'unpauseTemplate') {
						const unpauseTemplateId = this.getNodeParameter('unpauseTemplateId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${unpauseTemplateId}/unpause`,
								json: true,
							},
						);
					} else if (operation === 'compareTemplates') {
						const templateIds = this.getNodeParameter('compareTemplateIds', i) as string;
						const [templateId1, templateId2] = templateIds.split(',').map(id => id.trim());
						const startDate = this.getNodeParameter('compareStartDate', i) as string;
						const endDate = this.getNodeParameter('compareEndDate', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${templateId1}`,
								qs: {
									compare_id: templateId2,
									start: new Date(startDate).toISOString(),
									end: new Date(endDate).toISOString(),
								},
								json: true,
							},
						);
					} else if (operation === 'upsertMessageTemplates') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						const templateData = this.getNodeParameter('upsertTemplateData', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${businessAccountId}/upsert_message_templates`,
								body: JSON.parse(templateData),
								json: true,
							},
						);
					} else if (operation === 'migrateTemplates') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						const sourceWabaId = this.getNodeParameter('sourceWabaId', i) as string;
						const pageNumber = this.getNodeParameter('migratePageNumber', i, 0) as number;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${businessAccountId}/migrate_message_templates`,
								qs: {
									source_waba_id: sourceWabaId,
									...(pageNumber !== undefined && { page_number: pageNumber }),
								},
								json: true,
							},
						);
					}
				}

				// ========================================
				// BUSINESS PROFILE RESOURCE
				// ========================================
				else if (resource === 'businessProfile') {
					if (operation === 'getProfile') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${phoneNumberId}/whatsapp_business_profile`,
								qs: {
									fields: 'about,address,description,email,profile_picture_url,websites,vertical',
								},
								json: true,
							},
						);
					} else if (operation === 'updateProfile') {
						const about = this.getNodeParameter('about', i, '') as string;
						const address = this.getNodeParameter('address', i, '') as string;
						const description = this.getNodeParameter('description', i, '') as string;
						const email = this.getNodeParameter('email', i, '') as string;
						const vertical = this.getNodeParameter('vertical', i, '') as string;
						const websites = this.getNodeParameter('websites', i, '') as string;

						const body: any = { messaging_product: 'whatsapp' };
						if (about) body.about = about;
						if (address) body.address = address;
						if (description) body.description = description;
						if (email) body.email = email;
						if (vertical) body.vertical = vertical;
						if (websites) body.websites = websites.split(',').map((w) => w.trim());

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/whatsapp_business_profile`,
								body,
								json: true,
							},
						);
					} else if (operation === 'getBusinessAccount') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						const fields = this.getNodeParameter('accountFields', i, 'id,name,timezone_id') as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${businessAccountId}`,
								qs: { fields },
								json: true,
							},
						);
					} else if (operation === 'updateConversationalAutomation') {
						const enabledValue = this.getNodeParameter('enableAutomation', i) as boolean;
						const commands = this.getNodeParameter('automationCommands', i, '') as string;

						const body: any = { enable_welcome_message: enabledValue };
						if (commands) {
							body.prompts = commands.split(',').map((c) => c.trim());
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/whatsapp_business_profile`,
								body,
								json: true,
							},
						);
					} else if (operation === 'getCommerceSettings') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${phoneNumberId}/whatsapp_commerce_settings`,
								qs: {
									fields: 'is_catalog_visible,is_cart_enabled',
								},
								json: true,
							},
						);
					} else if (operation === 'updateCommerceSettings') {
						const catalogVisible = this.getNodeParameter('catalogVisible', i) as boolean;
						const cartEnabled = this.getNodeParameter('cartEnabled', i) as boolean;

						const body: any = {
							is_catalog_visible: catalogVisible,
							is_cart_enabled: cartEnabled,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/whatsapp_commerce_settings`,
								body,
								json: true,
							},
						);
					} else if (operation === 'getBusinessPublicKey') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${phoneNumberId}/whatsapp_business_encryption`,
								json: true,
							},
						);
					} else if (operation === 'setBusinessPublicKey') {
						const publicKey = this.getNodeParameter('publicKey', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${businessAccountId}/client_whatsapp_business_public_key`,
								body: {
									public_key: publicKey,
								},
								json: true,
							},
						);
					} else if (operation === 'setWebhookUrl') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						const callbackUrl = this.getNodeParameter('callbackUrl', i) as string;
						const verifyToken = this.getNodeParameter('verifyToken', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${businessAccountId}/subscribed_apps`,
								body: {
									override_callback_uri: callbackUrl,
									verify_token: verifyToken,
								},
								json: true,
							},
						);
					} else if (operation === 'deleteWebhookUrl') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/${businessAccountId}/subscribed_apps`,
								json: true,
							},
						);
					} else if (operation === 'getSubscribedApps') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${businessAccountId}/subscribed_apps`,
								json: true,
							},
						);
					}
				}

				// ========================================
				// PHONE NUMBER RESOURCE
				// ========================================
				else if (resource === 'phoneNumber') {
					if (operation === 'getPhoneNumbers') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${businessAccountId}/phone_numbers`,
								json: true,
							},
						);
					} else if (operation === 'getPhoneNumber') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${phoneNumberId}`,
								json: true,
							},
						);
					} else if (operation === 'registerPhone') {
						const pin = this.getNodeParameter('pin', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/register`,
								body: {
									messaging_product: 'whatsapp',
									pin,
								},
								json: true,
							},
						);
					} else if (operation === 'deregisterPhone') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/deregister`,
								json: true,
							},
						);
					} else if (operation === 'getPhoneSettings') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${phoneNumberId}/whatsapp_business_profile`,
								json: true,
							},
						);
					} else if (operation === 'updatePhoneSettings') {
						const settings = this.getNodeParameter('settings', i, '{}') as string;
						const settingsObj = JSON.parse(settings);

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/whatsapp_business_profile`,
								body: settingsObj,
								json: true,
							},
						);
					} else if (operation === 'updateDisplayName') {
						const displayName = this.getNodeParameter('displayName', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}`,
								body: {
									display_name: displayName,
								},
								json: true,
							},
						);
					} else if (operation === 'updateConversationalAutomation') {
						const enableWelcome = this.getNodeParameter('enableWelcomeMessage', i, false) as boolean;
						const promptsJson = this.getNodeParameter('prompts', i, '') as string;
						const commands = this.getNodeParameter('commands', i, '') as string;

						const body: any = {};
						if (enableWelcome !== null) body.enable_welcome_message = enableWelcome;
						if (promptsJson) body.prompts = JSON.parse(promptsJson);
						if (commands) body.commands = commands;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/conversational_automation`,
								body,
								json: true,
							},
						);
					} else if (operation === 'setPhoneWebhookUrl') {
						const callbackUrl = this.getNodeParameter('phoneCallbackUrl', i) as string;
						const verifyToken = this.getNodeParameter('phoneVerifyToken', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/subscribed_apps`,
								body: {
									override_callback_uri: callbackUrl,
									verify_token: verifyToken,
								},
								json: true,
							},
						);
					} else if (operation === 'deletePhoneWebhookUrl') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/${phoneNumberId}/subscribed_apps`,
								json: true,
							},
						);
					}
				}

				// ========================================
				// FLOW RESOURCE
				// ========================================
				else if (resource === 'flow') {
					if (operation === 'getFlows') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${businessAccountId}/flows`,
								json: true,
							},
						);
					} else if (operation === 'getFlow') {
						const flowId = this.getNodeParameter('flowId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${flowId}`,
								json: true,
							},
						);
					} else if (operation === 'createFlow') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						const flowName = this.getNodeParameter('flowName', i) as string;
						const flowCategories = this.getNodeParameter('flowCategories', i) as string[];

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${businessAccountId}/flows`,
								body: {
									name: flowName,
									categories: flowCategories,
								},
								json: true,
							},
						);
					} else if (operation === 'updateFlow') {
						const flowId = this.getNodeParameter('flowId', i) as string;
						const flowName = this.getNodeParameter('flowName', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${flowId}`,
								body: { name: flowName },
								json: true,
							},
						);
					} else if (operation === 'publishFlow') {
						const flowId = this.getNodeParameter('flowId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${flowId}/publish`,
								json: true,
							},
						);
					} else if (operation === 'deleteFlow') {
						const flowId = this.getNodeParameter('flowId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/${flowId}`,
								json: true,
							},
						);
					} else if (operation === 'deprecateFlow') {
						const flowId = this.getNodeParameter('flowId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${flowId}/deprecate`,
								json: true,
							},
						);
					} else if (operation === 'updateFlowJson') {
						const flowId = this.getNodeParameter('flowId', i) as string;
						const flowJson = this.getNodeParameter('flowJson', i) as string;

						// WhatsApp requires Flow JSON to be uploaded as multipart/form-data
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${flowId}/assets`,
								body: {
									file: {
										value: flowJson,
										options: {
											filename: 'flow.json',
											contentType: 'application/json',
										},
									},
									name: 'flow.json',
									asset_type: 'FLOW_JSON',
									messaging_product: 'whatsapp',
								},
								json: true,
							},
						);
					} else if (operation === 'getFlowMetrics') {
						const metricsFlowId = this.getNodeParameter('metricsFlowId', i) as string;
						const metricName = this.getNodeParameter('metricName', i) as string;
						const granularity = this.getNodeParameter('granularity', i) as string;
						const sinceDate = this.getNodeParameter('sinceDate', i, '') as string;
						const untilDate = this.getNodeParameter('untilDate', i, '') as string;

						const qs: any = {
							metric: metricName,
							granularity,
						};
						if (sinceDate) qs.since = new Date(sinceDate).toISOString().split('T')[0];
						if (untilDate) qs.until = new Date(untilDate).toISOString().split('T')[0];

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${metricsFlowId}/metrics`,
								qs,
								json: true,
							},
						);
					} else if (operation === 'getFlowAssets') {
						const assetsFlowId = this.getNodeParameter('assetsFlowId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${assetsFlowId}/assets?fields=name,asset_type,download_url`,
								json: true,
							},
						);
					} else if (operation === 'migrateFlows') {
						if (!businessAccountId) {
							throw new NodeOperationError(this.getNode(), 'Business Account ID is required for this operation');
						}

						const sourceFlowWabaId = this.getNodeParameter('sourceFlowWabaId', i) as string;
						const sourceFlowNames = this.getNodeParameter('sourceFlowNames', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${businessAccountId}/migrate_flows`,
								qs: {
									source_waba_id: sourceFlowWabaId,
									source_flow_names: sourceFlowNames,
								},
								json: true,
							},
						);
					} else if (operation === 'generateFlowTemplate') {
						const templateConfigStr = this.getNodeParameter('templateConfig', i) as string;

						let templateConfig;
						try {
							templateConfig = JSON.parse(templateConfigStr);
						} catch (error) {
							const errorMessage = error instanceof Error ? error.message : 'Unknown error';
							throw new NodeOperationError(
								this.getNode(),
								`Invalid JSON in Template Config: ${errorMessage}`,
								{ itemIndex: i }
							);
						}

						// Generate complete Flow JSON with version and routing
						responseData = {
							version: '5.0',
							data_api_version: '3.0',
							routing_model: templateConfig.routing_model || {},
							screens: templateConfig.screens || [],
						};
					} else if (operation === 'exchangeData') {
						const exchangeFlowId = this.getNodeParameter('exchangeFlowId', i) as string;
						const exchangeDataStr = this.getNodeParameter('exchangeData', i) as string;
						const sendAfterExchange = this.getNodeParameter('sendAfterExchange', i) as boolean;

						let exchangeDataObj;
						try {
							exchangeDataObj = JSON.parse(exchangeDataStr);
						} catch (error) {
							const errorMessage = error instanceof Error ? error.message : 'Unknown error';
							throw new NodeOperationError(
								this.getNode(),
								`Invalid JSON in Exchange Data: ${errorMessage}`,
								{ itemIndex: i }
							);
						}

						// First, exchange data with the Flow
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${exchangeFlowId}/data_exchange`,
								body: exchangeDataObj,
								json: true,
							},
						);

						// If sendAfterExchange is true, also send the Flow message
						if (sendAfterExchange) {
							const exchangeRecipient = this.getNodeParameter('exchangeRecipient', i) as string;
							const exchangeBodyText = this.getNodeParameter('exchangeBodyText', i) as string;
							const exchangeFlowCta = this.getNodeParameter('exchangeFlowCta', i) as string;
							const exchangeHeaderText = this.getNodeParameter('exchangeHeaderText', i, '') as string;
							const exchangeFooterText = this.getNodeParameter('exchangeFooterText', i, '') as string;

							const messageBody: any = {
								messaging_product: 'whatsapp',
								recipient_type: 'individual',
								to: exchangeRecipient,
								type: 'interactive',
								interactive: {
									type: 'flow',
									body: { text: exchangeBodyText },
									action: {
										name: 'flow',
										parameters: {
											flow_message_version: '3',
											flow_token: exchangeFlowId,
											flow_id: exchangeFlowId,
											flow_cta: exchangeFlowCta,
											flow_action: 'data_exchange',
											flow_action_payload: exchangeDataObj,
											mode: 'published',
										},
									},
								},
							};

							if (exchangeHeaderText) {
								messageBody.interactive.header = { type: 'text', text: exchangeHeaderText };
							}
							if (exchangeFooterText) {
								messageBody.interactive.footer = { text: exchangeFooterText };
							}

							// Send the Flow message
							const messageResponse = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'bcdrllcApi',
								{
									method: 'POST',
									url: `${baseUrl}/${phoneNumberId}/messages`,
									body: messageBody,
									json: true,
								},
							);

							// Return both exchange response and message response
							responseData = {
								dataExchange: responseData,
								message: messageResponse,
							};
						}
					}
				}

				// ========================================
				// CALL RESOURCE
				// ========================================
				else if (resource === 'call') {
					if (operation === 'initiateCall') {
						const callTo = this.getNodeParameter('callTo', i) as string;
						const sdpOfferJson = this.getNodeParameter('sdpOffer', i) as string;
						const sdpOffer = JSON.parse(sdpOfferJson);

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/calls`,
								body: {
									messaging_product: 'whatsapp',
									to: callTo,
									action: 'connect',
									session: sdpOffer,
								},
								json: true,
							},
						);
					} else if (operation === 'acceptCall') {
						const callId = this.getNodeParameter('callId', i) as string;
						const sdpAnswerJson = this.getNodeParameter('sdpAnswer', i, '{}') as string;
						const callbackData = this.getNodeParameter('callbackData', i, '') as string;
						const sdpAnswer = JSON.parse(sdpAnswerJson);

						const body: any = {
							messaging_product: 'whatsapp',
							call_id: callId,
							action: 'accept',
						};
						if (Object.keys(sdpAnswer).length > 0) {
							body.session = sdpAnswer;
						}
						if (callbackData) {
							body.biz_opaque_callback_data = callbackData;
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/calls`,
								body,
								json: true,
							},
						);
					} else if (operation === 'endCall') {
						const callId = this.getNodeParameter('callId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/calls`,
								body: {
									messaging_product: 'whatsapp',
									call_id: callId,
									action: 'terminate',
								},
								json: true,
							},
						);
					} else if (operation === 'preAcceptCall') {
						const callId = this.getNodeParameter('callId', i) as string;
						const sdpPreAccept = this.getNodeParameter('sdpPreAccept', i, '') as string;

						const body: any = {
							messaging_product: 'whatsapp',
							call_id: callId,
							action: 'pre_accept',
						};

						if (sdpPreAccept) {
							body.session = JSON.parse(sdpPreAccept);
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/calls`,
								body,
								json: true,
							},
						);
					} else if (operation === 'rejectCall') {
						const callId = this.getNodeParameter('callId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/calls`,
								body: {
									messaging_product: 'whatsapp',
									call_id: callId,
									action: 'reject',
								},
								json: true,
							},
						);
					} else if (operation === 'terminateCall') {
						const callId = this.getNodeParameter('callId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/calls`,
								body: {
									messaging_product: 'whatsapp',
									call_id: callId,
									action: 'terminate',
								},
								json: true,
							},
						);
					} else if (operation === 'getCallPermissions') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${phoneNumberId}/whatsapp_business_call_permissions`,
								json: true,
							},
						);
						const prefilledMessage = this.getNodeParameter('prefilledMessage', i) as string;
						const imageFormat = this.getNodeParameter('imageFormat', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/message_qrdls`,
								body: {
									prefilled_message: prefilledMessage,
									generate_qr_image: imageFormat,
								},
								json: true,
							},
						);
					} else if (operation === 'getQrCodes') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${phoneNumberId}/message_qrdls`,
								json: true,
							},
						);
					} else if (operation === 'getQrCode') {
						const qrCode = this.getNodeParameter('qrCode', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${phoneNumberId}/message_qrdls/${qrCode}`,
								json: true,
							},
						);
					} else if (operation === 'updateQrCode') {
						const qrCode = this.getNodeParameter('qrCode', i) as string;
						const prefilledMessage = this.getNodeParameter('prefilledMessage', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/message_qrdls`,
								body: {
									code: qrCode,
									prefilled_message: prefilledMessage,
								},
								json: true,
							},
						);
					} else if (operation === 'deleteQrCode') {
						const qrCode = this.getNodeParameter('qrCode', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/${phoneNumberId}/message_qrdls/${qrCode}`,
								json: true,
							},
						);
					}
				}

				// ========================================
				// USER RESOURCE
				// ========================================
				else if (resource === 'user') {
					if (operation === 'blockUser') {
						const userPhone = this.getNodeParameter('userPhone', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'POST',
								url: `${baseUrl}/${phoneNumberId}/block_users`,
								body: {
									messaging_product: 'whatsapp',
									block_users: [{ user: userPhone }],
								},
								json: true,
							},
						);
					} else if (operation === 'unblockUser') {
						const userPhone = this.getNodeParameter('userPhone', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/${phoneNumberId}/block_users`,
								body: {
									messaging_product: 'whatsapp',
									block_users: [{ user: userPhone }],
								},
								json: true,
							},
						);
					} else if (operation === 'getBlockedUsers') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'bcdrllcApi',
							{
								method: 'GET',
								url: `${baseUrl}/${phoneNumberId}/block_users`,
								json: true,
							},
						);
					}
				}

				// ========================================
				// SYSTEM RESOURCE
				// ========================================
				else if (resource === 'system') {
					if (operation === 'getAppAccessToken') {
						const appId = this.getNodeParameter('systemAppId', i) as string;
						const appSecret = this.getNodeParameter('appSecret', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `https://graph.facebook.com/v24.0/oauth/access_token`,
							qs: {
								grant_type: 'client_credentials',
								client_id: appId,
								client_secret: appSecret,
							},
							json: true,
						});
					} else if (operation === 'setAppCallbackUrl') {
						const appId = this.getNodeParameter('systemAppId', i) as string;
						const appAccessToken = this.getNodeParameter('appAccessToken', i) as string;
						const callbackUrl = this.getNodeParameter('systemCallbackUrl', i) as string;
						const verifyToken = this.getNodeParameter('systemVerifyToken', i) as string;
						const fields = this.getNodeParameter('subscriptionFields', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `https://graph.facebook.com/v24.0/${appId}/subscriptions`,
							qs: {
								object: 'whatsapp_business_account',
								callback_url: callbackUrl,
								verify_token: verifyToken,
								fields: fields,
								access_token: appAccessToken,
							},
							json: true,
						});
					}
				}

				returnData.push({
					json: responseData,
					pairedItem: i,
				});
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : String(error);
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: errorMessage,
						},
						pairedItem: i,
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: i });
			}
		}

		return [returnData];
	}
}