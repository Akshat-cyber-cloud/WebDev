import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  
    port: 587,             
    secure: false,
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
    }
})

transporter.verify((error) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
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