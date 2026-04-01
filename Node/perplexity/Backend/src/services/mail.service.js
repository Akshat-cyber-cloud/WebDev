import nodemailer from 'nodemailer';

/**
 * GMAIL NODEMAILER IMPLEMENTATION
 * This uses Gmail with App Passwords.
 * Ensure GMAIL_USER and GMAIL_APP_PASS are set in your environment.
 */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || "yourgmail@gmail.com",
    pass: process.env.GMAIL_APP_PASS || "your_app_password",
  },
});

export async function sendEmail({ to, subject, html, text = '' }) {
    try {
        const mailOptions = {
            from: `"Ember AI" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            text: text || (html ? html.replace(/<[^>]*>?/gm, '') : 'No content provided'),
            html: html || text,
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent via Gmail Nodemailer. ID:', info.messageId);
        return `Email sent successfully to ${to}`;
    } catch (error) {
        console.error('Nodemailer Error:', error.message);
        return `Failed to send email to ${to}. Error: ${error.message}. Please verify your GMAIL_ credentials in .env.`;
    }
}
