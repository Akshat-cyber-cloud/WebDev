import http from 'http';
import https from 'https';

/**
 * Periodically pings the server to keep it from sleeping on Render.
 * Render free tier sleeps after 15 minutes of inactivity.
 * We ping every 14 minutes to reset the timer.
 */
export const initKeepAlive = () => {
    const url = process.env.BACKEND_URL;

    if (!url) {
        console.warn('KEEP-ALIVE: BACKEND_URL is not defined in .env. Keep-alive service is inactive.');
        return;
    }

    // Ping every 14 minutes
    const interval = 14 * 60 * 1000;

    console.log(`KEEP-ALIVE: Service initialized. Pinging ${url}/api/health every 14 minutes.`);

    setInterval(async () => {
        try {
            const protocol = url.startsWith('https') ? https : http;
            
            protocol.get(`${url}/api/health`, (res) => {
                if (res.statusCode === 200) {
                    console.log('KEEP-ALIVE: Ping successful.');
                } else {
                    console.error(`KEEP-ALIVE: Ping failed with status code: ${res.statusCode}`);
                }
            }).on('error', (err) => {
                console.error('KEEP-ALIVE: Error during ping:', err.message);
            });
        } catch (err) {
            console.error('KEEP-ALIVE: Unexpected error during ping:', err.message);
        }
    }, interval);
};
