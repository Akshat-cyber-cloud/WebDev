import SibApiV3Sdk from 'sib-api-v3-sdk';
import nodemailer from 'nodemailer';

/**
 * EMAIL SERVICE
 * Provides multi-method delivery with Brevo as primary and Google OAuth2 as fallback.
 */

// Initialize Brevo Client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY || '';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export async function sendEmail({ to, subject, html, text = '' }) {
    // 1. Primary Attempt: Brevo API
    try {
        if (!process.env.BREVO_API_KEY) {
            throw new Error('BREVO_API_KEY is missing in environment variables.');
        }

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.htmlContent = html || text;
        sendSmtpEmail.textContent = text || (html ? html.replace(/<[^>]*>?/gm, '') : 'No content provided');
        
        // Ensure sender email is verified in Brevo Dashboard (Senders & IPs)
        sendSmtpEmail.sender = { 
            name: "Ember AI", 
            email: process.env.GMAIL_USER || process.env.GOOGLE_USER
        };
        
        sendSmtpEmail.to = [{ email: to }];

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('✅ Email sent via Brevo API. ID:', data.messageId || 'Success');
        return `Email sent via Brevo to ${to}`;

    } catch (brevoError) {
        // Detailed error for debugging
        const apiError = brevoError.response?.body?.message || brevoError.message || "Unknown Brevo Error";
        console.warn('⚠️ Brevo delivery failed, attempting Google OAuth fallback...');
        console.warn('Brevo Error Detail:', apiError);

        // 2. Fallback Attempt: Google OAuth2 via Nodemailer
        try {
            if (!process.env.GOOGLE_REFRESH_TOKEN || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
                throw new Error('Google OAuth credentials missing for fallback.');
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.GOOGLE_USER,
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                },
            });

            const mailOptions = {
                from: `"Ember AI" <${process.env.GOOGLE_USER}>`,
                to,
                subject,
                text: text || (html ? html.replace(/<[^>]*>?/gm, '') : 'No content provided'),
                html: html || text,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('🚀 Email sent via Google OAuth Fallback. ID:', info.messageId);
            return `Email sent via Google Fallback to ${to}`;

        } catch (fallbackError) {
            console.error('❌ CRITICAL: All email delivery methods failed.');
            console.error('Fallback Error Detail:', fallbackError.message);
            
            // Re-throw the original error to alert the user/caller
            throw new Error(`Mail failure. Primary(Brevo): ${apiError}. Fallback(Google): ${fallbackError.message}`);
        }
    }
}
