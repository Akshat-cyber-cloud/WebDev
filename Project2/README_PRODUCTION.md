# ⚔️ Gauntlet AI — Blind LLM Evaluation Platform

> A production-grade, full-stack platform for unbiased AI model benchmarking.
> Two language models compete anonymously. An AI judge scores them. You decide the final verdict.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Orchestration-FF6B35)](https://langchain-ai.github.io/langgraphjs/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## The Problem

Most LLM comparisons are biased. Researchers and developers tend to rate responses from well-known models higher — even when the content is identical — simply because they recognize the name (GPT-4, Claude, etc.). This is called **anchoring bias** and it invalidates most anecdotal benchmarks.

**Gauntlet AI eliminates this.** Inspired by the methodology of LMSYS Chatbot Arena, it forces blind evaluation: model identities are hidden until after the verdict is submitted, making results objectively more trustworthy.

---

## System Architecture

```
+-------------------------------------------------------------------------+
|                       CLIENT (React 19 + Vite)                          |
|                                                                         |
|  +----------+  +-----------+  +------------+  +-------------------+    |
|  | Login /  |  |  Battle   |  |  History   |  |   Leaderboard     |    |
|  | Register |  |  Arena    |  |  Page      |  |   Page            |    |
|  +----+-----+  +----+------+  +------+-----+  +---------+---------+    |
|       |              |               |                   |              |
|       +--------------+---------------+-------------------+              |
|                              |                                          |
|                    Axios (REST + credentials: include)                  |
+------------------------------+------------------------------------------+
                               |
                    +----------v----------+
                    |   Express 5 Server  |
                    |   (Node.js / TSX)   |
                    |                     |
                    |  [ CORS Policy ]    |
                    |  [ Cookie Parser ]  |
                    |  [ JWT Protect  ]   |
                    |  [ Passport.js  ]   |
                    +-----+-------+-------+
                          |       |
          +---------------+       +-------------------+
          |                                           |
+---------v---------+                   +-------------v-----------+
|   Auth Routes     |                   |     Battle Routes        |
|   /api/auth/*     |                   |  POST /use-graph         |
|                   |                   |  POST /api/battles/      |
|  - register       |                   |       finalize           |
|  - login          |                   |  GET  /api/battles/      |
|  - google OAuth   |                   |       history            |
|  - logout         |                   |  GET  /api/battles/      |
|  - /me            |                   |       leaderboard        |
+---------+---------+                   +-------------+-----------+
          |                                           |
+---------v---------+                   +-------------v-----------------------+
|  Auth Layer       |                   |    LangGraph Orchestrator           |
|  Passport.js      |                   |                                     |
|  Google OAuth 2.0 |                   |  START                              |
|  Local Strategy   |                   |    |                                |
|  JWT + bcrypt     |                   |    v                                |
+-------------------+                   |  [ solution_node ]                  |
                                        |    |-- Mistral API --> solution_1   |
                                        |    |-- Gemini API  --> solution_2   |
                                        |    |-- latency_ms per model         |
                                        |    v                                |
                                        |  [ judge_node ] (Groq LLM)         |
                                        |    |-- scores both 0-10             |
                                        |    |-- structured reasoning         |
                                        |    |-- determines winner            |
                                        |    v                                |
                                        |  END --> Auto-save to MongoDB       |
                                        +-------------------------------------+
                                                          |
                              +---------------------------+
                              |
              +---------------v-----------------------------------+
              |              MongoDB (Atlas)                      |
              |                                                   |
              |   [ User Collection ]   [ Battle Collection ]    |
              |   - _id                 - userId (ref: User)     |
              |   - name                - query                  |
              |   - email               - solution_1 {}          |
              |   - password (hashed)     |-- name               |
              |   - googleId              |-- content            |
              |                           |-- score (0-10)       |
              |                           |-- reasoning          |
              |                           +-- metrics {}         |
              |                         - solution_2 {} (same)   |
              |                         - judgeWinner            |
              |                         - userWinner (override)  |
              |                         - isFinalized            |
              +---------------------------------------------------+
```

---

## Data Flow — Battle Lifecycle

```
1. USER submits a prompt (from BattlePage)
         |
         v
2. JWT middleware validates HttpOnly cookie
   -> req.user attached to request
         |
         v
3. POST /use-graph -> LangGraph state machine invoked
         |
         |--[sequential]--> Mistral API call  --> solution_1 + metrics
         |--[sequential]--> Gemini API call   --> solution_2 + metrics
         |
         v
4. Judge Node (Groq) evaluates both solutions
   -> Returns structured JSON: scores, reasoning, winner
         |
         v
5. Battle auto-saved to MongoDB (isFinalized: false)
   -> Model names NEVER sent to client (blind phase)
   -> Frontend shows: Entity_A vs Entity_B
         |
         v
6. USER reads both responses (blind) and submits their verdict
         |
         v
7. POST /api/battles/finalize
   -> userWinner written, isFinalized: true
   -> Model identities NOW revealed to user
         |
         v
8. GET /api/battles/leaderboard (public)
   -> MongoDB $facet pipeline computes all stats in one query
   -> Returns: wins, user wins, avg score, avg latency per model
```

---

## LangGraph State Machine (Deep Dive)

The AI orchestration layer is a **compiled LangGraph state machine** with two nodes and deterministic edges. All state fields are validated with Zod schemas.

**Graph topology:**
```
START ---> [solution_node] ---> [judge_node] ---> END
```

**State Schema:**

| Field | Type | Description |
|---|---|---|
| `messages` | `HumanMessage[]` | The user prompt injected at START |
| `solution_1` | `string` | Mistral's markdown response |
| `solution_1_metrics` | `object` | latency_ms, prompt_tokens, completion_tokens, total_tokens |
| `solution_2` | `string` | Gemini's markdown response |
| `solution_2_metrics` | `object` | Same structure |
| `judge` | `object` | score_1, score_2, reasoning_1, reasoning_2, winner enum |

**solution_node:**
- Attaches a `SystemMessage` with markdown formatting instructions
- Invokes Mistral and Gemini **sequentially** using `performance.now()` for accurate per-model latency
- Extracts token usage from `usage_metadata` or `response_metadata` (normalized across providers)
- Returns state updates for solution_1, solution_2, and both metric objects

**judge_node:**
- Sends both solutions to Groq with a structured prompt requiring raw JSON output (no markdown)
- Parses the JSON response and computes winner via score comparison
- Returns the complete `judge` state object

---

## Tech Stack

### Backend

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | 18+ |
| Language | TypeScript | 6.x |
| Framework | Express | 5.x |
| AI Orchestration | LangChain + LangGraph | `@langchain/langgraph ^1.2.7` |
| LLM — Competitor 1 | Mistral AI | `@langchain/mistralai ^1.0.7` |
| LLM — Competitor 2 | Google Gemini | `@langchain/google ^0.1.10` |
| LLM — Judge | Groq (Llama 3) | `@langchain/groq ^1.2.0` |
| Database | MongoDB + Mongoose | `mongoose ^9.4.1` |
| Auth | Passport.js + JWT | Google OAuth 2.0 + Local Strategy |
| Password Hashing | bcryptjs | `^3.0.3` |
| Dev Server | tsx watch | `^4.21.0` |

### Frontend

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19.x |
| Build Tool | Vite | 7.x |
| Styling | Tailwind CSS | 4.x |
| Animations | Framer Motion | 12.x |
| HTTP Client | Axios | `^1.15.0` |
| Routing | React Router Dom | v7 |
| Markdown Rendering | react-markdown + remark-gfm + remark-breaks | `^10.x` |

---

## Core Features

### Neural Battle Arena
- Prompt dispatched to Mistral and Gemini via LangGraph state machine
- Models are anonymous during evaluation (Entity_A / Entity_B)
- Real-time latency (ms) and token count telemetry per model
- Full Markdown rendering with GFM support for code, tables, and lists

### High-Court Judging System
- Groq (Llama 3) acts as LLM-as-judge, scoring 1-10 on accuracy, clarity, and depth
- Structured reasoning chain included with every verdict
- Human-in-the-loop override — users can validate or overrule the AI judge
- Both judge verdict and human verdict stored separately for inter-rater analysis

### Researcher Auth Portal
- Google OAuth 2.0 via Passport.js (find-or-create pattern for existing users)
- Email/password registration with bcrypt hashing
- JWT-based session management via HttpOnly cookies
- `trust proxy: 1` configured for secure cookie handling behind Render's proxy

### Global Leaderboard
- All battles persisted to MongoDB with full telemetry
- Leaderboard aggregates: AI wins, human override wins, avg score, avg latency
- Single `$facet` aggregation query — no N+1 queries
- Complete battle history with per-battle review and reveal toggle

---

## Project Structure

```
gauntlet-ai/
|
+-- Backend/
|   +-- server.ts                   # Entry point: connects DB, starts HTTP server
|   +-- tsconfig.json
|   +-- package.json
|   +-- src/
|       +-- app.ts                  # Express app: middleware stack, routes, CORS
|       |
|       +-- config/
|       |   +-- config.ts           # Typed environment variable exports
|       |   +-- db.ts               # Mongoose connection with error handling
|       |   +-- passport.ts         # Google OAuth 2.0 + Local strategies
|       |
|       +-- controllers/
|       |   +-- auth.controller.ts  # register, login, googleCallback
|       |   +-- battle.controller.ts# finalizeBattle, getBattleHistory, getLeaderboard
|       |
|       +-- middlewares/
|       |   +-- auth.middleware.ts  # Reads JWT cookie, verifies, attaches req.user
|       |
|       +-- models/
|       |   +-- user.model.ts       # Mongoose User schema
|       |   +-- battle.model.ts     # Mongoose Battle schema (full telemetry + verdicts)
|       |
|       +-- routes/
|       |   +-- auth.routes.ts      # /register /login /google /google/callback /logout /me
|       |
|       +-- services/
|       |   +-- graph.service.ts    # LangGraph compiled state machine
|       |   +-- models.service.ts   # LangChain model instantiation (Gemini, Groq, Mistral)
|       |
|       +-- types/                  # TypeScript type augmentations (Express Request)
|       +-- utils/                  # Shared utility functions
|
+-- Frontend/
    +-- index.html
    +-- vite.config.js
    +-- vercel.json                  # SPA rewrite: all paths -> index.html
    +-- src/
        +-- main.jsx                 # React root, BrowserRouter
        +-- App.jsx                  # Route definitions
        +-- index.css                # Global styles, Tailwind directives
        |
        +-- pages/
        |   +-- LandingPage.jsx      # Hero / marketing page
        |   +-- Login.jsx            # Login form (email + Google OAuth button)
        |   +-- Register.jsx         # Registration form
        |   +-- BattlePage.jsx       # Main battle arena (prompt -> results -> verdict)
        |   +-- HistoryPage.jsx      # Past battles with identity reveal toggle
        |   +-- LeaderboardPage.jsx  # Win rates, scores, latency stats
        |
        +-- components/
        |   +-- common/              # Navbar, Footer, ProtectedRoute wrapper
        |   +-- home/                # Landing page section components
        |   +-- ui/                  # Reusable primitives (cards, buttons, badges)
        |
        +-- context/                 # React Context for auth state / user session
        +-- hooks/                   # Custom hooks (useBattle, useAuth)
        +-- constants/               # API base URL, route constants
        +-- layouts/                 # Shared page layouts (authenticated, public)
```

---

## Authentication Flow

```
Email/Password Registration:
  POST /api/auth/register
  -> bcryptjs hashes password (salt rounds: 10)
  -> User document saved to MongoDB
  -> JWT signed with JWT_SECRET, set as HttpOnly cookie (secure in prod)

Email/Password Login:
  POST /api/auth/login
  -> Passport LocalStrategy verifies credentials against DB
  -> JWT cookie issued on success

Google OAuth 2.0:
  GET /api/auth/google
  -> Redirects to Google consent screen (scope: profile, email)
  GET /api/auth/google/callback
  -> Passport GoogleStrategy: findOrCreate user by googleId
  -> JWT issued, redirect to frontend with session

Protected Middleware (auth.middleware.ts):
  -> Reads JWT from req.cookies
  -> Verifies with jsonwebtoken
  -> Attaches decoded user to req.user
  -> All /use-graph and /api/battles/* routes (except leaderboard) protected
```

---

## API Reference

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register with name, email, password |
| `POST` | `/api/auth/login` | Public | Login, receive JWT cookie |
| `GET` | `/api/auth/google` | Public | Initiate Google OAuth flow |
| `GET` | `/api/auth/google/callback` | Public | OAuth callback, issue JWT |
| `POST` | `/api/auth/logout` | Protected | Clear JWT cookie |
| `GET` | `/api/auth/me` | Protected | Get current user profile |

### Battle Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/use-graph` | Protected | Submit prompt, run LangGraph, save battle |
| `POST` | `/api/battles/finalize` | Protected | Submit human verdict, mark battle finalized |
| `GET` | `/api/battles/history` | Protected | Fetch user's complete battle history |
| `GET` | `/api/battles/leaderboard` | Public | Aggregated win/score/latency stats |

### Sample Request / Response

**POST `/use-graph`**
```json
// Request Body
{ "query": "Explain the CAP theorem in distributed systems." }

// Response
{
  "battleId": "64f3a1c2b8e4d200123abc45",
  "query": "Explain the CAP theorem in distributed systems.",
  "solution_1": "### CAP Theorem\n\nThe **CAP theorem** states...",
  "solution_1_metrics": {
    "latency_ms": 1823,
    "prompt_tokens": 42,
    "completion_tokens": 310,
    "total_tokens": 352
  },
  "solution_2": "### Understanding CAP\n\nIn distributed systems...",
  "solution_2_metrics": {
    "latency_ms": 2104,
    "prompt_tokens": 42,
    "completion_tokens": 287,
    "total_tokens": 329
  },
  "judge": {
    "solution_1_score": 8,
    "solution_1_reasoning": "Clear explanation with accurate trade-off analysis...",
    "solution_2_score": 7,
    "solution_2_reasoning": "Good depth but missed eventual consistency nuances...",
    "winner": "solution_1"
  }
}
```

**GET `/api/battles/leaderboard`**
```json
{
  "totalBattles": 142,
  "mistral": {
    "wins": 68,
    "userWins": 55,
    "avgScore": 7.4,
    "avgLatency": 1650
  },
  "gemini": {
    "wins": 74,
    "userWins": 87,
    "avgScore": 7.8,
    "avgLatency": 2100
  }
}
```

---

## Database Schema

### `users` Collection

```typescript
{
  _id:       ObjectId,
  name:      String,    // required
  email:     String,    // unique, required
  password:  String,    // bcrypt hash (null for OAuth-only users)
  googleId:  String,    // present for Google OAuth users
  createdAt: Date,
  updatedAt: Date
}
```

### `battles` Collection

```typescript
{
  _id:     ObjectId,
  userId:  ObjectId,  // ref: 'User'
  query:   String,    // the original prompt

  solution_1: {         // always Mistral
    name:      "MISTRAL",
    content:   String,  // full markdown response
    score:     Number,  // 0-10 from Groq judge
    reasoning: String,  // judge's explanation
    metrics: {
      latency_ms:        Number,
      prompt_tokens:     Number,
      completion_tokens: Number,
      total_tokens:      Number
    }
  },

  solution_2: { ... }, // always Gemini — identical structure

  judgeWinner: "solution_1" | "solution_2",  // AI judge's verdict
  userWinner:  "solution_1" | "solution_2",  // human override (optional)
  isFinalized: Boolean,  // false until user submits verdict

  createdAt: Date,
  updatedAt: Date
}
```

---

## Environment Variables

Create a `.env` file in the `/Backend` directory:

```env
# Server
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/gauntlet

# Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_chars

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# AI Model APIs
GROQ_API_KEY=gsk_...
GEMINI_API_KEY=AIza...
MISTRAL_API_KEY=...
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- API keys: Groq, Google Gemini, Mistral, Google OAuth credentials

### Installation

```bash
# Clone the repo
git clone https://github.com/Akshat-cyber-cloud/gauntlet-ai.git
cd gauntlet-ai

# Install backend dependencies
cd Backend && npm install

# Install frontend dependencies
cd ../Frontend && npm install
```

### Running Locally

```bash
# Terminal 1 — Backend (hot-reload with tsx watch)
cd Backend
npm run dev
# Listening on http://localhost:5000

# Terminal 2 — Frontend (Vite dev server)
cd Frontend
npm run dev
# Available at http://localhost:5173
```

### Production Build

```bash
# Backend: compile TypeScript
cd Backend && npm run build   # tsc -> dist/
npm start                     # node dist/server.js

# Frontend: bundle for production
cd Frontend && npm run build  # Vite -> dist/
# Deploy dist/ to Vercel or Netlify
```

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| **LangGraph over raw Promise.all** | Provides a compiled, deterministic state machine with typed state. Graph edges enforce execution order (solutions must complete before judging). Trivially extensible to add nodes (pre-processor, fact-checker, re-ranker). |
| **Sequential model calls (not parallel)** | Mistral and Gemini are invoked sequentially so `performance.now()` timestamps capture accurate per-model latency without clock skew from true parallelism. |
| **HttpOnly JWT cookie** | Prevents XSS-based token theft vs. `localStorage`. `credentials: include` in Axios sends the cookie cross-origin. `trust proxy: 1` on Express handles Render's reverse proxy for the `Secure` flag. |
| **Groq as judge** | Groq's inference API offers sub-second latency via hardware-accelerated Llama 3 — critical for keeping total round-trip time reasonable without a streaming UX. |
| **MongoDB `$facet` aggregation** | Computes all leaderboard stats (AI wins, human wins, averages for both models) in a single DB round-trip instead of multiple queries. |
| **`isFinalized` flag** | Cleanly separates the blind evaluation phase from the reveal phase. The backend knows which battle is pending a human verdict; the client can block re-submission. |
| **Blind evaluation (no model names in response)** | `solution_1` / `solution_2` are returned without model names. The frontend maps these to Entity_A / Entity_B. Identity is only revealed after `finalize` is called — enforcing the protocol at the API level, not just the UI level. |
| **Zod-validated LangGraph state** | Every field in the graph state has a Zod schema with defaults and a typed reducer. This catches malformed API responses at the state boundary rather than downstream. |

---

## Leaderboard Aggregation Logic

The leaderboard endpoint uses a single MongoDB `$facet` pipeline that runs five sub-pipelines simultaneously:

```javascript
$facet: {
  mistral:     [{ $match: { judgeWinner: 'solution_1' } }, { $count: 'wins' }],
  gemini:      [{ $match: { judgeWinner: 'solution_2' } }, { $count: 'wins' }],
  userMistral: [{ $match: { userWinner:  'solution_1' } }, { $count: 'wins' }],
  userGemini:  [{ $match: { userWinner:  'solution_2' } }, { $count: 'wins' }],
  averages: [{
    $group: {
      _id: null,
      avg_m1_score:   { $avg: '$solution_1.score'              },
      avg_m2_score:   { $avg: '$solution_2.score'              },
      avg_m1_latency: { $avg: '$solution_1.metrics.latency_ms' },
      avg_m2_latency: { $avg: '$solution_2.metrics.latency_ms' }
    }
  }]
}
```

This computes **AI judge win rate**, **human override win rate**, and **average score + latency** for both models in a single database round-trip.

---

## Deployment

| Service | Platform | Config |
|---|---|---|
| Frontend | Vercel | `vercel.json` rewrites all routes to `index.html` for SPA routing |
| Backend | Render | `npm start` -> `node dist/server.js`; `trust proxy: 1` for secure cookies |
| Database | MongoDB Atlas | Connection via `MONGODB_URI` environment variable |

---

## Why Blind Evaluation Matters

> Research shows humans consistently rate responses from well-known models higher — even when the content is identical. By hiding model identities until after the verdict, Gauntlet AI removes anchoring bias from the evaluation process. This mirrors the methodology used in LMSYS Chatbot Arena, a widely cited academic LLM benchmarking study.

Gauntlet AI applies the double-blind principle from clinical trials to AI evaluation. By decoupling model identity from model output during the judgment phase, it produces evaluation data that is:

- **Reproducible** — every battle stored with full telemetry (tokens, latency, scores)
- **Comparable** — consistent Groq scoring rubric (accuracy, clarity, depth) across all battles
- **Auditable** — human verdicts tracked separately from AI verdicts for inter-rater agreement analysis

---

*Built with LangChain, LangGraph, Express 5, React 19, and MongoDB Atlas.*
