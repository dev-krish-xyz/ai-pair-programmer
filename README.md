# AI Pair Programmer

> Your code. Reviewed by 3 AIs. One writes. One critiques. One explains.

A Multi-Agent AI Pair Programmer web application where users paste code and receive:
1. **Improved/Refactored Code** - from the Builder Agent
2. **Strict Code Review** - from the Reviewer Agent
3. **Clear Explanation of Changes** - from the Explainer Agent

Built with Blackbox AI ⚡

## 🆓 Free AI Providers Supported!

This app supports **FREE** AI providers so you can use it without any cost:

| Provider | Cost | Get API Key |
|----------|------|-------------|
| **Groq** (Recommended) | ✅ FREE | [console.groq.com/keys](https://console.groq.com/keys) |
| **Google Gemini** | ✅ FREE | [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| OpenAI | 💰 Paid | [platform.openai.com](https://platform.openai.com/api-keys) |

## Features

- 🤖 **Multi-Agent Architecture** - Three specialized AI agents work together
- ⚡ **Parallel Processing** - Builder and Reviewer run simultaneously for faster results
- 🆓 **Free Tier Support** - Use Groq or Gemini for zero-cost analysis
- 🎨 **Dark Mode UI** - Developer-first design with beautiful dark theme
- 📝 **Multi-Language Support** - JavaScript, TypeScript, Python, Java, C#, Go, Rust, C++, Ruby, PHP
- 📋 **Tabbed Output** - Clean, organized results in separate tabs
- 🚀 **Production Ready** - Deploy to Vercel with one click

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI Providers:** Groq (free), Google Gemini (free), OpenAI (paid)
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API key from Groq (free), Gemini (free), or OpenAI (paid)

### Installation

1. **Clone the repository**
   ```bash
   cd ai-pair-programmer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API key (choose ONE):
   
   **Option 1: Groq (FREE - Recommended)**
   ```bash
   # Get free key: https://console.groq.com/keys
   GROQ_API_KEY=gsk_your_key_here
   ```
   
   **Option 2: Google Gemini (FREE)**
   ```bash
   # Get free key: https://aistudio.google.com/app/apikey
   GEMINI_API_KEY=your_key_here
   ```
   
   **Option 3: OpenAI (Paid)**
   ```bash
   # Get key: https://platform.openai.com/api-keys
   OPENAI_API_KEY=sk-your_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Input                           │
│                    (Code + Language)                        │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      Orchestrator                           │
│              (Coordinates all agents)                       │
└─────────────────────────┬───────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
            ▼                           ▼
┌───────────────────┐       ┌───────────────────┐
│   Builder Agent   │       │  Reviewer Agent   │
│   (Refactors)     │       │   (Reviews)       │
│                   │       │                   │
│   PARALLEL        │       │   PARALLEL        │
└─────────┬─────────┘       └─────────┬─────────┘
          │                           │
          │                           │
          ▼                           │
┌───────────────────────────────────────────────────────────┐
│                    Explainer Agent                         │
│         (Compares original vs improved code)               │
│                                                            │
│                    SEQUENTIAL                              │
└───────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Merged Results                           │
│        (Builder + Reviewer + Explainer outputs)             │
└─────────────────────────────────────────────────────────────┘
```

## Usage

1. Click "Try the AI Pair Programmer" on the landing page
2. Select your programming language from the dropdown
3. Paste your code in the text area
4. Click "Run Agents"
5. View results in three tabs:
   - **✨ Improved Code** - Refactored version of your code
   - **🔍 Review Notes** - Issues, warnings, and suggestions
   - **📘 Explanation** - What changed and why

## API Reference

### POST /api/analyze

Analyzes code using all three AI agents.

**Request Body:**
```json
{
  "code": "function add(a, b) { return a + b; }",
  "language": "javascript"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "builder": {
      "improvedCode": "...",
      "summary": "..."
    },
    "reviewer": {
      "issues": [...],
      "strengths": [...],
      "summary": "..."
    },
    "explainer": {
      "changes": [...],
      "overallExplanation": "...",
      "learningPoints": [...]
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "processingTimeMs": 5000
}
```

### GET /api/provider

Returns current AI provider information.

**Response:**
```json
{
  "success": true,
  "provider": {
    "name": "Groq",
    "model": "llama-3.3-70b-versatile",
    "isFree": true
  }
}
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variable (choose one):
   - `GROQ_API_KEY` - Your Groq API key (free)
   - `GEMINI_API_KEY` - Your Gemini API key (free)
   - `OPENAI_API_KEY` - Your OpenAI API key (paid)
4. Deploy!

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GROQ_API_KEY` | One of three | - | Groq API key (FREE) |
| `GEMINI_API_KEY` | One of three | - | Google Gemini API key (FREE) |
| `OPENAI_API_KEY` | One of three | - | OpenAI API key (paid) |
| `GROQ_MODEL` | No | `llama-3.3-70b-versatile` | Groq model |
| `GEMINI_MODEL` | No | `gemini-1.5-flash` | Gemini model |
| `OPENAI_MODEL` | No | `gpt-4o-mini` | OpenAI model |

## Project Structure

```
ai-pair-programmer/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze/
│   │   │   │   └── route.ts      # Main analysis endpoint
│   │   │   └── provider/
│   │   │       └── route.ts      # Provider info endpoint
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main page
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   ├── CodeInput.tsx         # Code input form
│   │   ├── ResultsPanel.tsx      # Results container
│   │   ├── BuilderOutput.tsx     # Builder results
│   │   ├── ReviewerOutput.tsx    # Reviewer results
│   │   └── ExplainerOutput.tsx   # Explainer results
│   ├── hooks/
│   │   └── useCodeAnalysis.ts    # Analysis hook
│   ├── lib/
│   │   ├── agents/               # AI agent implementations
│   │   │   ├── ai-client.ts      # Unified AI client (Groq/Gemini/OpenAI)
│   │   │   ├── builder-agent.ts
│   │   │   ├── reviewer-agent.ts
│   │   │   ├── explainer-agent.ts
│   │   │   └── prompts.ts        # Optimized AI prompts
│   │   └── orchestrator.ts       # Agent coordinator
│   └── types/
│       ├── api.ts                # API types
│       └── index.ts              # Type exports
├── .env.example                  # Environment template
├── .env.local                    # Local environment (gitignored)
├── package.json
├── tailwind.config.ts
└── README.md
```

## Free Tier Limits

### Groq (Recommended)
- 30 requests/minute
- 14,400 requests/day
- Models: Llama 3.3 70B, Llama 3.1 8B, Mixtral 8x7B

### Google Gemini
- 15 requests/minute
- 1,500 requests/day
- Models: Gemini 1.5 Flash, Gemini 1.5 Pro

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

---

Built with ❤️ using Blackbox AI
