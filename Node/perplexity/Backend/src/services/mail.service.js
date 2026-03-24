import { google } from 'googleapis';

/**
 * GMAIL REST API IMPLEMENTATION
 * This bypasses Render's SMTP blocks by using HTTPS (Port 443).
 * It reuses your existing GOOGLE_CLIENT_ID, SECRET, and REFRESH_TOKEN.
 */

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

console.log("Mail System: Gmail REST API initialized (HTTPS Mode)");

export async function sendEmail({ to, subject, html, text = '' }) {
    try {
        // Encode subject to handle special characters
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        
        const messageParts = [
            `From: Ember AI <${process.env.GOOGLE_USER}>`,
            `To: ${to}`,
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
            html || text,
        ];
        const message = messageParts.join('\n');

        // Gmail API requires base64url encoding of the raw message
        const encodedMessage = Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage,
            },
        });

        console.log('Email sent via REST API. ID:', res.data.id);
        return `Email sent successfully to ${to}`;
    } catch (error) {
        console.error('Gmail REST API Error:', error.message);
        return `Failed to send email to ${to}. Error: ${error.message}. Please verify your GOOGLE_ credentials in Render.`;
    }
}