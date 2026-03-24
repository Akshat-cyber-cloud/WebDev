import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Log status on start
console.log("Mail System: Resend API initialized (Key status:", process.env.RESEND_API_KEY ? "Present" : "MISSING", ")");

export async function sendEmail({to, subject, html, text = ""}) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Ember AI <onboarding@resend.dev>', // Default testing sender
            to,
            subject,
            html,
            text: text || undefined // Only include if present
        });

        if (error) {
            console.error("Resend send failed:", error.message);
            throw error;
        }

        console.log("Email Sent Success (Resend ID):", data.id);
        return `Email Sent Successfully to ${to}`;
    } catch (error) {
        console.error("sendEmail tool failed:", error.message);
        return `Failed to send email to ${to}. Error: ${error.message}. Please verify that RESEND_API_KEY is correctly set in Render environment variables.`;
    }
}