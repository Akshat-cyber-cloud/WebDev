import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import runGraph from './services/graph.service.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

app.post('/use-graph', async (req, res) => {
  try {
    const result = await runGraph("What is the capital of India?");
    res.json({
      solution_1: result.solution_1,
      solution_2: result.solution_2,
      judge: result.judge,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default app;