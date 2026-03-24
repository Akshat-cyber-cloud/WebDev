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

app.use((req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ message: "API route not found" });
    }

    const indexPath = path.join(__dirname, '../../Frontend/dist/index.html');
    res.sendFile(indexPath);
});

export default app;