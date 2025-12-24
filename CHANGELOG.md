# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-12-24

### 🚀 Major Release - Complete WhatsApp Cloud API Coverage

This release represents a complete rewrite and expansion of the package, achieving 100% feature parity with the WhatsApp Cloud API.

### Added

#### Message Operations
- **Send Text Messages** with preview URL control
- **Send Media Messages**: images, videos, audio, voice notes, documents, stickers
- **Interactive Messages**:
  - Interactive Buttons (up to 3 quick reply buttons)
  - Interactive Lists (organized sections with multiple options)
  - WhatsApp Flows (NFM - New Forms Message)
- **Location Sharing** with name and address
- **Contact Sharing** with multiple contact cards
- **Product Messages**:
  - Send single product from catalog
  - Send multiple products (up to 30)
  - Send full catalog view
- **Reactions** to messages
- **Reply** to specific messages
- **Marketing Messages** with template support
- **Send Raw API Request** for custom endpoints

#### Flow Management (NEW)
- Create flows with name and categories
- Get single flow details
- List all flows for business account
- Update flow metadata (name)
- Update Flow JSON templates (multipart/form-data upload)
- Get flow assets with download URLs
- Publish flows to production
- Deprecate flows
- Delete flows
- Get flow performance metrics
- Migrate flows between business accounts
- **Generate Flow JSON Template** - Helper tool to create structured Flow templates with data-exchange actions

#### Template Management
- Create message templates
- Get template details
- List all templates with filtering
- Update templates
- Delete templates
- Compare templates across accounts
- Migrate templates between WABAs
- Unpause rejected templates
- **Upsert Message Templates** - Bulk create/update authentication templates

#### Business Profile
- Get business profile information
- Update business profile (description, address, email, websites, etc.)
- Get commerce settings
- Update commerce settings
- **Get Business Public Key** - Retrieve encryption public key for Flows

#### Phone Number Management
- Register phone numbers
- Deregister phone numbers
- Get phone number details
- List all phone numbers
- Get phone number settings
- Update phone number settings
- Update conversational automation
- Update display name

#### Call Operations
- Get call permissions for user
- Initiate voice/video calls
- Pre-accept call (early media)
- Accept call with SDP
- Reject call
- Terminate active call

#### QR Code Management
- Create QR codes with prefilled messages
- Get QR code details and analytics
- List all QR codes
- Update QR code message
- Delete QR codes

#### User Management
- Block users
- Unblock users
- Get list of blocked users

#### Media Operations
- Upload media files (< 100MB)
- Get media URL from media ID
- Download media files
- Delete uploaded media
- Create upload session for large files (> 25MB)
- Upload file chunks to session
- Get upload session status

#### Webhook & System
- Set app-level callback URL
- Set WABA alternate callback URL
- Delete WABA callback URL
- Set phone-level callback URL  
- Delete phone callback URL
- Get app access token
- Get WABA subscribed apps

#### Message Actions
- Mark messages as read
- Set typing indicators

#### Webhooks (Trigger Nodes)
- **BcdrllcTrigger** - Receive message webhooks (text, media, interactive responses, etc.)
- **BcdrllcFlowTrigger** - Handle Flow Data Exchange requests with encryption support

### Changed

- **BREAKING**: Upgraded to n8n API version 1
- **BREAKING**: Restructured operation organization by resource type
- Improved error handling with detailed error messages
- Enhanced parameter validation
- Better TypeScript type definitions
- Optimized request handling

### Fixed

- Flow JSON upload now uses proper multipart/form-data format
- Flow assets endpoint includes required fields parameter
- Media upload handles binary data correctly
- Webhook signature verification for Flow data exchange

### Technical Improvements

- Type-safe TypeScript implementation
- Comprehensive JSDoc comments
- Modular code organization
- Support for large file uploads (chunked upload sessions)
- Proper encryption/decryption for Flow webhooks
- JWT signature verification for webhook security

### Coverage

- ✅ **100% M GraphApiService parity** (67/67 methods)
- ✅ **100% PyWa API parity** (12/12 methods)
- ✅ **147+ operations** (up from ~50 in v1.0.0)

### Migration Guide from v1.0.0

#### Breaking Changes
1. **Operation Names**: Some operations have been renamed for clarity
   - `sendMessage` → `sendText`
   - `sendInteractive` → `sendInteractiveButtons` or `sendInteractiveList`
   
2. **Resource Organization**: Operations are now organized by resource type:
   - Message operations under "Message" resource
   - Template operations under "Template" resource
   - Flow operations under "Flow" resource
   - etc.

3. **Parameter Changes**: Some parameters have been restructured for better usability

#### Recommended Migration Steps
1. Review your existing workflows
2. Update operation selections to new names
3. Test thoroughly in development environment
4. Deploy to production

## [1.0.0] - 2024-12-XX

### Initial Release

- Basic WhatsApp Cloud API integration
- Send text messages
- Send media
- Template messages
- Basic webhook support

---

For more information, visit:
- **NPM Package**: https://www.npmjs.com/package/n8n-nodes-bcdrllc
- **GitHub Repository**: https://github.com/BCDRLLC/n8n-nodes-bcdrllc
- **Documentation**: https://bcdr.sa

[2.0.0]: https://github.com/BCDRLLC/n8n-nodes-bcdrllc/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/BCDRLLC/n8n-nodes-bcdrllc/releases/tag/v1.0.0
