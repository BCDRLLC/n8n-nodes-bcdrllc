# n8n-nodes-bcdrllc

![BCDR Company](https://r2.bcdr.sa/images/bimilogo.svg)

**BCDR Company** - Cloud API integration for n8n

Send messages, media, templates, and manage business communications directly from your n8n workflows.

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** > **Community Nodes**
3. Click **Install** and search for `n8n-nodes-bcdrllc`
4. Click **Install**

### Manual Installation

```bash
npm install n8n-nodes-bcdrllc
```

## Configuration

### Credentials Setup

1. Get your API credentials from Meta for Developers
2. In n8n, create new **Bcdrllc API** credentials
3. Enter the following:
   - **Access Token**: Your access token
   - **Phone Number ID**: Your phone number ID  
   - **Business Account ID**: (Optional) Your business account ID
   - **API Version**: v21.0 (or your preferred version)

## Features

### Message Operations
- **Send Text**: Send text messages with URL preview support
- **Send Interactive**: Send interactive messages with buttons
- **Send Location**: Share location coordinates
- **Send Contact**: Send contact information
- **React to Message**: React to messages with emojis

### Media Operations
- **Send Image**: Send images with optional captions
- **Send Video**: Send videos with optional captions
- **Send Audio**: Send audio files
- **Send Document**: Send documents with custom filenames
- **Send Sticker**: Send stickers

### Template Operations
- **Send Template**: Send pre-approved template messages

## Usage Examples

### Send Text Message

```json
{
  "resource": "message",
  "operation": "sendText",
  "to": "966565430200",
  "message": "Hello from BCDR Company!",
  "previewUrl": true
}
```

### Send Interactive Message with Buttons

```json
{
  "resource": "message",
  "operation": "sendInteractive",
  "to": "966565430200",
  "bodyText": "Choose an option:",
  "buttons": [
    {"type": "reply", "reply": {"id": "opt1", "title": "Option 1"}},
    {"type": "reply", "reply": {"id": "opt2", "title": "Option 2"}}
  ]
}
```

### Send Image

```json
{
  "resource": "media",
  "operation": "sendImage",
  "to": "966565430200",
  "mediaUrl": "https://example.com/image.jpg",
  "caption": "Check this out!"
}
```

### Send Template

```json
{
  "resource": "template",
  "operation": "sendTemplate",
  "to": "966565430200",
  "templateName": "hello_world",
  "languageCode": "en",
  "components": []
}
```

## About BCDR Company

**BCDR Company** (شركة بي سي دي آر)

- **Website**: https://bcdr.sa
- **Email**: sales@bcdr.sa
- **Phone**: +966565430200
- **Location**: Jeddah, Saudi Arabia
- **CR Number**: 4030587068
- **VAT Number**: 311728280700003

## Support

For issues and questions:
- **Email**: sales@bcdr.sa
- **GitHub**: https://github.com/BCDRLLC/n8n-nodes-bcdrllc/issues
- **Documentation**: https://bcdr.sa/docs

## License

MIT License - Copyright (c) 2025 BCDR Company

## Version

1.0.0 - Initial release

---

**Built with ❤️ by BCDR Company ®**
