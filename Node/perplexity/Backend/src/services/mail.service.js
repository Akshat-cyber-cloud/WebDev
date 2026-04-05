import SibApiV3Sdk from 'sib-api-v3-sdk';

/**
 * EMAIL SERVICE
 * Provides multi-method delivery with Google REST API as primary and Brevo as fallback.
 */

// Initialize Brevo Client lazily to ensure environment variables are loaded
let apiInstance = null;
function getBrevoInstance() {
    if (!apiInstance) {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.BREVO_API_KEY || '';
        apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    }
    return apiInstance;
}

// ---------------------------------------------------------
// GMAIL REST API HELPERS
// ---------------------------------------------------------

/**
 * Gets a fresh access token from Google using the refresh token.
 */
async function getAccessToken() {
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
            grant_type: 'refresh_token',
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Google Token Refresh Failed: ${error.error_description || error.error || response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
}

/**
 * Constructs a Base64URL encoded MIME (RFC 822) message.
 */
function constructMimeMessage({ to, from, subject, html, text }) {
    const boundary = `----=_Part_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    const plainText = text || (html ? html.replace(/<[^>]*>?/gm, '') : 'No content provided');
    const htmlContent = html || text;

    const messageParts = [
        `From: "Ember AI" <${from}>`,
        `To: ${to}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/alternative; boundary="${boundary}"`,
        '',
        `--${boundary}`,
        `Content-Type: text/plain; charset=utf-8`,
        `Content-Transfer-Encoding: 7bit`,
        '',
        plainText,
        '',
        `--${boundary}`,
        `Content-Type: text/html; charset=utf-8`,
        `Content-Transfer-Encoding: 7bit`,
        '',
        htmlContent,
        '',
        `--${boundary}--`,
    ];

    const message = messageParts.join('\r\n');
    return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// ---------------------------------------------------------
// MAIN EXPORT
// ---------------------------------------------------------

export async function sendEmail({ to, subject, html, text = '' }) {
    // 1. Primary Attempt: GMAIL REST API (Port 443 - Most reliable on Render)
    try {
        if (!process.env.GOOGLE_REFRESH_TOKEN || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_USER) {
            const missing = [];
            if (!process.env.GOOGLE_USER) missing.push('GOOGLE_USER');
            if (!process.env.GOOGLE_CLIENT_ID) missing.push('GOOGLE_CLIENT_ID');
            if (!process.env.GOOGLE_CLIENT_SECRET) missing.push('GOOGLE_CLIENT_SECRET');
            if (!process.env.GOOGLE_REFRESH_TOKEN) missing.push('GOOGLE_REFRESH_TOKEN');
            throw new Error(`Google OAuth credentials missing: ${missing.join(', ')}`);
        }

        // A. Refresh Token
        const accessToken = await getAccessToken();

        // B. Encode Message
        const rawMessage = constructMimeMessage({
            to,
            from: process.env.GOOGLE_USER,
            subject,
            html,
            text
        });

        // C. Send via REST API
        const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ raw: rawMessage }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Gmail API Send Failed: ${error.error?.message || response.statusText}`);
        }

        const data = await response.json();
        console.log(`✅ [SUCCESS] Email delivered via GMAIL REST API (Primary). Path: Port 443. Sender: ${process.env.GOOGLE_USER}. ID: ${data.id}`);
        return `Email sent via Google to ${to}`;

    } catch (googleError) {
        console.warn('⚠️ Google REST API delivery failed, attempting Brevo fallback...');
        console.warn('Google Error Code:', googleError.code || 'N/A');
        console.warn('Google Error Detail:', googleError.message);

        // 2. Fallback Attempt: Brevo API
        try {
            if (!process.env.BREVO_API_KEY) {
                throw new Error('BREVO_API_KEY is missing in environment variables.');
            }

            const brevo = getBrevoInstance();
            const senderEmail = process.env.GOOGLE_USER || "no-reply@ember-ai.com";
            const plainText = text || (html ? html.replace(/<[^>]*>?/gm, '') : 'No content provided');
            
            const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            sendSmtpEmail.subject = subject;
            sendSmtpEmail.htmlContent = html || text;
            sendSmtpEmail.textContent = plainText;
            
            sendSmtpEmail.sender = { 
                name: "Ember AI", 
                email: senderEmail
            };
            
            sendSmtpEmail.to = [{ email: to }];

            const data = await brevo.sendTransacEmail(sendSmtpEmail);
            console.log(`🚀 [SUCCESS] Email delivered via BREVO (Fallback). Sender: ${senderEmail}. ID: ${data.messageId || 'Success'}`);
            return `Email sent via Brevo Fallback to ${to}`;

        } catch (brevoError) {
            const apiError = brevoError.response?.body?.message || brevoError.message || "Unknown Brevo Error";
            console.error('❌ CRITICAL: All email delivery methods failed.');
            console.error('Brevo Fallback Error Detail:', apiError);
            
            throw new Error(`Mail failure. Primary(Google REST): ${googleError.message}. Fallback(Brevo): ${apiError}`);
        }
    }
}
