import * as crypto from 'crypto';

/**
 * Decrypt a Flow request from WhatsApp
 * Implementation based on: https://developers.facebook.com/docs/whatsapp/flows/guides/implementingyourflowendpoint
 */
export function decryptFlowRequest(
	encryptedFlowData: string,
	encryptedAesKey: string,
	initialVector: string,
	privateKey: string,
	privateKeyPassword?: string,
): { decryptedData: any; aesKey: Buffer; iv: Buffer } {
	// Decode base64 inputs
	const flowData = Buffer.from(encryptedFlowData, 'base64');
	const iv = Buffer.from(initialVector, 'base64');
	const encryptedKey = Buffer.from(encryptedAesKey, 'base64');

	// Decrypt AES key using RSA private key
	const privateKeyObj = crypto.createPrivateKey({
		key: privateKey,
		format: 'pem',
		passphrase: privateKeyPassword,
	});

	const aesKey = crypto.privateDecrypt(
		{
			key: privateKeyObj,
			padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
			oaepHash: 'sha256',
		},
		encryptedKey,
	);

	// Split encrypted data and auth tag
	const encryptedFlowDataBody = flowData.slice(0, -16);
	const encryptedFlowDataTag = flowData.slice(-16);

	// Decrypt flow data using AES-GCM
	const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, iv);
	decipher.setAuthTag(encryptedFlowDataTag);

	let decryptedData = decipher.update(encryptedFlowDataBody, undefined, 'utf8');
	decryptedData += decipher.final('utf8');

	return {
		decryptedData: JSON.parse(decryptedData),
		aesKey,
		iv,
	};
}

/**
 * Encrypt a Flow response to send back to WhatsApp
 * Implementation based on: https://developers.facebook.com/docs/whatsapp/flows/guides/implementingyourflowendpoint
 */
export function encryptFlowResponse(response: any, aesKey: Buffer, iv: Buffer): string {
	// Flip IV bits (XOR with 0xFF)
	const flippedIv = Buffer.alloc(iv.length);
	for (let i = 0; i < iv.length; i++) {
		flippedIv[i] = iv[i] ^ 0xff;
	}

	// Encrypt response using AES-GCM with flipped IV
	const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, flippedIv);
	
	const responseJson = JSON.stringify(response);
	let encrypted = cipher.update(responseJson, 'utf8');
	encrypted = Buffer.concat([encrypted, cipher.final()]);

	// Get auth tag and append it to encrypted data
	const authTag = cipher.getAuthTag();
	const encryptedWithTag = Buffer.concat([encrypted, authTag]);

	// Return base64 encoded result
	return encryptedWithTag.toString('base64');
}

/**
 * Validate webhook signature using HMAC-SHA256
 */
export function validateWebhookSignature(
	body: string,
	signature: string,
	appSecret: string,
): boolean {
	const hmac = crypto.createHmac('sha256', appSecret);
	hmac.update(body);
	const calculatedSignature = 'sha256=' + hmac.digest('hex');
	
	return crypto.timingSafeEqual(
		Buffer.from(signature),
		Buffer.from(calculatedSignature),
	);
}
