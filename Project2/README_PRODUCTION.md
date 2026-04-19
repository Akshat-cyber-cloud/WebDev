Gauntlet AI — Blind LLM Evaluation Platform

A production-grade, full-stack platform for blind model benchmarking. Two AI models compete anonymously on any prompt — an automated judge scores them, and you decide the final verdict.

What Is This?
Most LLM comparisons are biased — people pick GPT over Mistral not because it's better, but because they recognize the name. Gauntlet AI eliminates that.
Prompts are dispatched to Gemini and Mistral simultaneously. Their responses appear as Entity_A and Entity_B — no labels, no branding. Groq evaluates both as an automated LLM-as-judge. You can validate or override the verdict. Every battle is logged. The leaderboard shows the truth.

Architecture
User Prompt
     │
     ▼
LangGraph Orchestrator
     │
     ├──► Gemini API  ──► Response A ──┐
     │                                 ├──► Groq Judge ──► Verdict + Scores
     └──► Mistral API ──► Response B ──┘
                                             │
                                        Human Override
                                             │
                                        MongoDB (battle log)
                                             │
                                        Live Leaderboard

Tech Stack
Backend
LayerTechnologyRuntimeNode.jsLanguageTypeScriptFrameworkExpress 5AI OrchestrationLangChain + LangGraphDatabaseMongoDB + MongooseAuthPassport.js (Google OAuth 2.0 + Local)SecurityBcryptjs + JWT
Frontend
LayerTechnologyFrameworkReact 19 + ViteStylingTailwind CSS 4AnimationsFramer Motion 12HTTP ClientAxiosRoutingReact Router DomRenderingReact Markdown

Core Features
⚔️ Neural Battle Arena

Parallel prompt dispatch to Gemini and Mistral via LangGraph
Models are anonymous until the verdict is finalized (Entity_A vs Entity_B)
Real-time latency (ms) and token count telemetry per model
Full Markdown rendering for technical and code responses

🏛️ High-Court Judging System

Groq acts as automated LLM-as-judge — scores 1–10 on accuracy, clarity, and depth
Structured reasoning chain included with every verdict
Human-in-the-loop override — researchers can validate or overrule the AI judge
Inter-rater agreement tracked between human and model verdicts

🔐 Researcher Auth Portal

Google OAuth 2.0 via Passport.js
Email/password registration with bcrypt hashing
JWT-based session management with cookie-level security

📊 Global Leaderboard & Battle History

All battles persisted to MongoDB with full telemetry
Leaderboard ranks models by win rate, average score, and response latency
Complete battle log with per-battle review


Getting Started
Prerequisites

Node.js 18+
MongoDB (local or Atlas)
API keys: Groq, Google Gemini, Mistral, Google OAuth credentials

Installation
bash# Clone the repo
git clone https://github.com/Akshat-cyber-cloud/gauntlet-ai.git
cd gauntlet-ai

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
Environment Variables
Create a .env file in the /backend directory:
envPORT=5000
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# AI Models
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
Run
bash# Start backend
cd backend
npm run dev

# Start frontend (new terminal)
cd frontend
npm run dev
Frontend runs on http://localhost:5173 — Backend on http://localhost:5000

API Overview
MethodEndpointDescriptionPOST/auth/registerEmail/password registrationPOST/auth/loginLogin + JWT issueGET/auth/googleGoogle OAuth redirectPOST/battle/startDispatch prompt to both modelsPOST/battle/verdictSubmit human verdict overrideGET/battle/historyFetch all past battlesGET/leaderboardGet model rankings

Project Structure
gauntlet-ai/
├── backend/
│   ├── src/
│   │   ├── agents/          # LangGraph orchestration flows
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/       # Auth, error handling
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express route definitions
│   │   └── index.ts         # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Route-level pages
│   │   └── main.tsx         # Entry point
│   └── package.json
└── README.md

Why "Blind" Evaluation Matters
Research shows humans consistently rate responses from well-known models higher — even when the content is identical. By hiding model identities until after the verdict, Gauntlet AI removes anchoring bias from the evaluation process. This mirrors the methodology used in LMSYS Chatbot Arena, a widely cited academic LLM benchmarking study.
