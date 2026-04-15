import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import runGraph from './services/graph.service.js';
import authRoutes from './routes/auth.routes.js';
import passport from 'passport';
import configurePassport from './config/passport.js';

dotenv.config();

configurePassport();
const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({

  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

app.post('/use-graph', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const result = await runGraph(query);
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