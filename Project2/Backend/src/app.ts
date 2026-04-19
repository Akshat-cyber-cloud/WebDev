import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import runGraph from './services/graph.service.js';
import authRoutes from './routes/auth.routes.js';
import passport from 'passport';
import configurePassport from './config/passport.js';
import { protect } from './middlewares/auth.middleware.js';
import * as battleController from './controllers/battle.controller.js';
import Battle from './models/battle.model.js';

dotenv.config();

configurePassport();
const app = express();

// Trust Render's proxy for secure cookies
app.set('trust proxy', 1);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
// Clean FRONTEND_URL by removing trailing slash if present
const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');

app.use(cors({
  origin: frontendUrl,
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

app.post('/use-graph', protect, async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const result = await runGraph(query);

    // Auto-save battle to DB
    const savedBattle = await Battle.create({
      userId: req.user?._id,
      query,
      solution_1: {
        name: 'MISTRAL',
        content: result.solution_1,
        score: result.judge.solution_1_score,
        reasoning: result.judge.solution_1_reasoning,
        metrics: result.solution_1_metrics,
      },
      solution_2: {
        name: 'GEMINI',
        content: result.solution_2,
        score: result.judge.solution_2_score,
        reasoning: result.judge.solution_2_reasoning,
        metrics: result.solution_2_metrics,
      },
      judgeWinner: result.judge.winner,
      isFinalized: false,
    });

    res.json({
      battleId: savedBattle._id,
      query,
      solution_1: result.solution_1,
      solution_1_metrics: result.solution_1_metrics,
      solution_2: result.solution_2,
      solution_2_metrics: result.solution_2_metrics,
      judge: result.judge,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Battle Routes
app.post('/api/battles/finalize', protect, battleController.finalizeBattle);
app.get('/api/battles/history', protect, battleController.getBattleHistory);
app.get('/api/battles/leaderboard', battleController.getLeaderboard);

export default app;