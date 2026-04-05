import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import chatRouter from './routes/chat.routes.js';
import morgan from 'morgan';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev"));
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

// Serve static files from Frontend/dist
app.use(express.static(path.join(__dirname, '../../Frontend/dist')));

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter)

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is healthy" });
});

app.use((req, res) => {
    if (req.path.startsWith('/socket.io/')) {
        return; // Pass to the next handler (Socket.io)
    }

    // 2. Handle API routes
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ message: "API route not found" });
    }

    // 3. Fallback for SPA routing (serve index.html)
    const indexPath = path.join(__dirname, '../../Frontend/dist/index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("Error sending index.html:", err.message);
            res.status(404).send("Frontend build not found. Please run 'npm run build' in the Frontend folder.");
        }
    });
});


export default app;