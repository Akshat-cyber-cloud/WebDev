import SibApiV3Sdk from 'sib-api-v3-sdk';
import nodemailer from 'nodemailer';

/**
 * EMAIL SERVICE
 * Provides multi-method delivery with Google OAuth2 as primary and Brevo as fallback.
 */

// Initialize Brevo Client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY || '';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export async function sendEmail({ to, subject, html, text = '' }) {
    // 1. Primary Attempt: Google OAuth2 via Nodemailer
    try {
        if (!process.env.GOOGLE_REFRESH_TOKEN || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
            throw new Error('Google OAuth credentials missing.');
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
        console.log('✅ Email sent via Google OAuth (Primary). ID:', info.messageId);
        return `Email sent via Google to ${to}`;

    } catch (googleError) {
        console.warn('⚠️ Google OAuth delivery failed, attempting Brevo fallback...');
        console.warn('Google Error Detail:', googleError.message);

        // 2. Fallback Attempt: Brevo API
        try {
            if (!process.env.BREVO_API_KEY) {
                throw new Error('BREVO_API_KEY is missing in environment variables.');
            }

            const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            sendSmtpEmail.subject = subject;
            sendSmtpEmail.htmlContent = html || text;
            sendSmtpEmail.textContent = text || (html ? html.replace(/<[^>]*>?/gm, '') : 'No content provided');
            
            sendSmtpEmail.sender = { 
                name: "Ember AI", 
                email: process.env.GMAIL_USER || process.env.GOOGLE_USER
            };
            
            sendSmtpEmail.to = [{ email: to }];

            const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('🚀 Email sent via Brevo API Fallback. ID:', data.messageId || 'Success');
            return `Email sent via Brevo Fallback to ${to}`;

        } catch (brevoError) {
            const apiError = brevoError.response?.body?.message || brevoError.message || "Unknown Brevo Error";
            console.error('❌ CRITICAL: All email delivery methods failed.');
            console.error('Brevo Fallback Error Detail:', apiError);
            
            throw new Error(`Mail failure. Primary(Google): ${googleError.message}. Fallback(Brevo): ${apiError}`);
        }
    }
}
