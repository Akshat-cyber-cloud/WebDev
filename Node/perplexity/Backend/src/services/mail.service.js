import nodemailer from 'nodemailer';

// Simplified transporter to ensure the app boots quickly on Render.
// Port 465 + secure: true is the most stable setting for SMTPS.
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  
    port: 465,             
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
    },
    connectionTimeout: 5000, // Wait max 5s for connection
    greetingTimeout: 5000,   // Wait max 5s for greeting
})

// Log variable presence on start (Safe log)
console.log("Mail System: GOOGLE_USER status =", process.env.GOOGLE_USER ? "Configured" : "NOT CONFIGURED");

export async function sendEmail({to,subject,html,text = ""}){
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }

    try {
        // Try to verify connection ONLY when sending
        await transporter.verify();
        
        const details = await transporter.sendMail(mailOptions);
        console.log("Email Sent Success: ", details.messageId);
        return `Email Sent Successfully to ${to}`;
    } catch (error) {
        console.error("sendEmail tool failed:", error.message);
        return `Failed to send email to ${to}. Error: ${error.message}. Please check Render environment variables.`;
    }
}