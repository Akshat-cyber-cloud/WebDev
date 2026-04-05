import 'dotenv/config';
import { sendEmail } from './src/services/mail.service.js';

async function test() {
    console.log('--- Email Service Test ---');
    console.log(`Sending to: ${process.env.GOOGLE_USER}`);
    
    try {
        const result = await sendEmail({
            to: process.env.GOOGLE_USER, // Sending to yourself for verification
            subject: 'Test Email from Ember AI fallback system',
            html: `
                <h1>Email System Test</h1>
                <p>This email was sent to verify your mail delivery system.</p>
                <p>If you received this, your fallback or primary method is working!</p>
            `
        });
        console.log('Result:', result);
    } catch (error) {
        console.error('Final Test Error:', error.message);
    }
}

test();
