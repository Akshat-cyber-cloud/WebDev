# 🔥 Ember AI

> **A real-time AI chatbot that keeps you in the loop — live news, worldwide updates, and Gmail, all in one intelligent interface.**

![Ember AI Banner](https://img.shields.io/badge/Ember-AI-ff6a2f?style=for-the-badge&logo=firebase&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## ✨ What is Ember AI?

**Ember AI** is an intelligent conversational assistant that answers questions grounded in **real-time data**. Unlike static AI chatbots, Ember connects to live news feeds, worldwide event streams, and your personal **Gmail inbox** — so every answer is fresh, relevant, and personal.

Whether you want to know what's happening in the world right now, get a summary of your latest emails, or just have a smart conversation — Ember has you covered.

---

## 🚀 Features

- 🌍 **Real-Time News & Updates** — Ask about anything happening right now. Ember fetches live data and responds with up-to-date information from across the globe.
- 📬 **Gmail Integration** — Read, summarize, and interact with your emails directly through the chat interface. No switching tabs.
- 💬 **Conversational AI** — Natural, multi-turn conversations powered by a large language model backend.
- 🧠 **Context Awareness** — Ember remembers the context of your conversation for more meaningful, coherent replies.
- 🔐 **Secure Auth** — OAuth 2.0-based Gmail authentication. Your data stays yours.
- 📱 **Responsive UI** — Clean, modern chat interface that works beautifully on desktop and mobile.
- 🗄️ **Persistent Chat History** — All conversations are stored in MongoDB so you can revisit past sessions anytime.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **AI / LLM** | OpenAI API / Custom LLM Integration |
| **Real-Time News** | News API / Web Scraping |
| **Email** | Gmail API (OAuth 2.0) |
| **Auth** | JWT + Google OAuth |
| **Deployment** | (e.g. Vercel / Render / AWS) |

---

## 📁 Project Structure

```
ember-ai/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level pages
│       ├── hooks/           # Custom React hooks
│       ├── context/         # Global state (Auth, Chat)
│       ├── services/        # API call wrappers
│       └── App.jsx
│
├── server/                  # Node.js backend
│   ├── config/              # DB & env config
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Auth, error handling
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routes
│   ├── services/            # News API, Gmail, AI logic
│   └── index.js
│
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Google Cloud project with Gmail API enabled
- News API key (from [newsapi.org](https://newsapi.org))
- OpenAI API key (or your preferred LLM provider)

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ember-ai.git
cd ember-ai
```

### 2. Set Up Environment Variables

Copy the example env file and fill in your keys:

```bash
cp .env.example .env
```

```env
# Server
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ember-ai

# Auth
JWT_SECRET=your_jwt_secret

# Google / Gmail
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback

# AI
OPENAI_API_KEY=your_openai_api_key

# News
NEWS_API_KEY=your_news_api_key
```

### 3. Install Dependencies

```bash
# Install backend deps
cd server
npm install

# Install frontend deps
cd ../client
npm install
```

### 4. Run the App

```bash
# Terminal 1 — Start backend
cd server
npm run dev

# Terminal 2 — Start frontend
cd client
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🔥

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login with credentials |
| `GET` | `/api/auth/google` | Initiate Google OAuth |
| `GET` | `/api/auth/google/callback` | OAuth callback handler |

### Chat
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat/message` | Send a message to Ember AI |
| `GET` | `/api/chat/history` | Fetch user's chat history |
| `DELETE` | `/api/chat/:id` | Delete a conversation |

### Gmail
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/gmail/inbox` | Fetch latest Gmail messages |
| `GET` | `/api/gmail/message/:id` | Get a specific email |

### News
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/news/latest` | Get latest global headlines |
| `GET` | `/api/news/search?q=` | Search news by topic |

---

## 🧩 How It Works

```
User Message
     │
     ▼
Express Server
     │
     ├──► Intent Detection (Is it a news query? Gmail? General?)
     │
     ├──► News API / Gmail API (if needed for real-time data)
     │
     ├──► Context + Data injected into LLM prompt
     │
     └──► AI Response ──► MongoDB (saved) ──► React UI
```

---

## 🔒 Security

- All routes are protected with JWT middleware
- Gmail access uses scoped OAuth 2.0 — only reads what's necessary
- Passwords are hashed with bcrypt
- Environment variables are never committed to source control

---

## 🗺️ Roadmap

- [x] Real-time news answering
- [x] Gmail read & summarize
- [x] Persistent chat history
- [ ] Voice input support
- [ ] Calendar integration (Google Calendar)
- [ ] Proactive alerts (breaking news notifications)
- [ ] Multi-user workspace / team mode
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

## 👤 Author

Made with 🔥 by **[Your Name]**
- GitHub: [@yourusername](https://github.com/Akshat-cyber-cloud)
- LinkedIn: [yourlinkedin](https://www.linkedin.com/in/akshat-gupta132/)

---

<p align="center">
  <b>Ember AI — Stay informed. Stay connected. Stay ahead.</b>
</p>