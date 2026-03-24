import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  
    port: 465,             
    secure: true,
    debug: true,
    logger: true,
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
    }
})

console.log("Mail Config: GOOGLE_USER is", process.env.GOOGLE_USER ? "defined" : "MISSING");

transporter.verify((error) => {
  if (error) {
    console.error('SMTP Connection Failed:', error.message);
  } else {
    console.log('SMTP Connection Success: Ready to send messages');
  }
});

export async function sendEmail({to,subject,html,text = ""}){
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }

    try {
        const details = await transporter.sendMail(mailOptions);
        console.log("Email Sent: ", details);
        return `Email Sent Successfully to ${to}`;
    } catch (error) {
        console.error("sendEmail tool failed:", error.message);
        return `Failed to send email to ${to}. Error: ${error.message}. Please verify that GOOGLE_USER, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN are correctly set in Render environment variables.`;
    }
}