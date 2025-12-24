# Publishing n8n-nodes-bcdrllc to NPM

## Pre-Publishing Checklist

✅ All files created with **Bcdrllc** branding only
✅ No mentions of "pywa" in any files
✅ BCDR Company information included
✅ MIT License applied

## Project Structure

```
n8n-nodes-bcdrllc/
├── credentials/
│   └── BcdrllcApi.credentials.ts    # API credentials configuration
├── nodes/
│   └── Bcdrllc/
│       ├── Bcdrllc.node.ts          # Main node implementation
│       └── bcdrllc.svg              # Node icon
├── package.json                      # NPM package configuration
├── tsconfig.json                     # TypeScript configuration
├── README.md                         # Documentation
├── LICENSE                          # MIT License
└── .gitignore                       # Git ignore rules
```

## Build and Publish Steps

### 1. Install Dependencies

```bash
cd /home/bcdr/Public/n8n-nodes-bcdrllc
npm install
```

### 2. Build the Project

```bash
npm run build
```

This will compile TypeScript files to JavaScript in the `dist/` directory.

### 3. Test Locally (Optional)

Link the package locally to test in your n8n instance:

```bash
npm link
cd ~/.n8n/custom
npm link n8n-nodes-bcdrllc
```

### 4. Login to NPM

```bash
npm login
```

### 5. Publish to NPM

```bash
npm publish
```

The package will be available at: **https://www.npmjs.com/package/n8n-nodes-bcdrllc**

## Post-Publishing

After successful publication:

1. ✅ Package available at: https://www.npmjs.com/package/n8n-nodes-bcdrllc
2. ✅ Users can install via n8n Community Nodes
3. ✅ Users can install via `npm install n8n-nodes-bcdrllc`

## Features Included

### Resources
- **Message**: Text, Interactive, Location, Contact, Reaction
- **Media**: Image, Video, Audio, Document, Sticker
- **Template**: Send pre-approved templates

### Operations
- Send Text Message (with URL preview)
- Send Interactive Message (with buttons)
- Send Location
- Send Contact
- React to Message
- Send Image/Video/Audio/Document/Sticker
- Send Template Message

## API Integration

This node integrates with **WhatsApp Cloud API** via:
- Base URL: `https://graph.facebook.com/v21.0`
- Authentication: Bearer token
- Messaging endpoint: `/messages`

## Support

- **Email**: sales@bcdr.sa
- **Phone**: +966565430200
- **Website**: https://bcdr.sa
- **GitHub**: https://github.com/BCDRLLC/n8n-nodes-bcdrllc

---

**BCDR Company ® - Built with ❤️ in Saudi Arabia**
