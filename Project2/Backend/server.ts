import app from './src/app.js';
import connectDB from './src/config/db.js';

// Connect to Database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);

    // Keep Render free tier awake by self-pinging every 14 minutes
    // Render spins down after 15 min of inactivity on free plan
    if (process.env.NODE_ENV === 'production') {
        const BACKEND_URL = process.env.BACKEND_URL || `https://gauntletai.onrender.com`;
        const PING_INTERVAL_MS = 14 * 60 * 1000; // 14 minutes

        setInterval(async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/health`);
                console.log(`[Keep-Alive] Pinged /health → ${res.status}`);
            } catch (err) {
                console.error(`[Keep-Alive] Ping failed:`, err);
            }
        }, PING_INTERVAL_MS);

        console.log(`[Keep-Alive] Self-ping scheduled every 14 minutes → ${BACKEND_URL}/health`);
    }
});