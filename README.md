# 🍳 AI Chef Quest — Fridge-to-Recipe Experience

An interactive, visual cooking application powered by AI (Groq API). **AI Chef Quest** transforms ingredients in your kitchen into structured, cookable recipes with step-by-step guidance, dynamic serving scaling, and resilient data validation.

---

## 🚀 Quick Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and configure your Groq API key:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
PORT=3001
```

### 3. Run Development Servers
To start both the Express backend API proxy (port 3001) and Vite React frontend (port 3000):
```bash
npm run dev:all
```

Open **http://localhost:3000** in your browser.

---

## 🏗️ Project Architecture & Data Flow

```text
React Frontend (Vite)
       │
   HTTP POST /api/generate-recipes
       │
       ▼
Backend Proxy (Express) ──[ Holds GROQ_API_KEY ]──► Groq API (openai/gpt-oss-20b)
       │                                                     │
       ▼                                              Structured JSON
 Parse + Schema Validation (Zod) ◄───────────────────────────┘
       │
       ▼
  Normalize & Sanitize
       │
       ▼
 React State (UI Rendering)
```

- **Frontend (`src/`)**: Pure stateful React UI. Never communicates with LLM APIs directly.
- **Backend Proxy (`server/`)**: Secure Express endpoint holding the `GROQ_API_KEY` to forward strict prompts to Groq.
- **Validation Boundary (`src/lib/validateRecipe.js`)**: Enforces strict JSON shape validation with Zod before state mutation.
- **Stale Response Guard (`src/hooks/useRecipeGeneration.js`)**: Uses a `requestId` sequence ref and `AbortController` to prevent out-of-order race conditions.

---

## 🛡️ Failure Modes & Error Handling Matrix

| Failure Mode | Detection Point | UI State Shown | Recovery Action |
|---|---|---|---|
| **Malformed JSON** | `JSON.parse()` catch in `lib/api.js` | `ErrorState` card ("We couldn't read the recipe response.") | ✅ Retry Button |
| **Wrong Shape / Missing Fields** | `Zod` schema validation in `lib/validateRecipe.js` | `ErrorState` card (Generic safe message) | ✅ Retry Button |
| **Empty Response (`""`, `{}`)** | `validateRecipe.js` zero-element guard | `ErrorState` card | ✅ Retry Button |
| **HTTP 400 / Decommissioned Model** | `server/generateRecipes.js` response check | Handled by model auto-fallback & `ErrorState` | ✅ Retry Button |
| **Network Failure / 500** | `fetch` exception catch in `api.js` | `ErrorState` card ("Server error") | ✅ Retry Button |
| **Stale / Late Responses** | `requestId` guard in `useRecipeGeneration.js` | Silently discarded; current UI untouched | N/A (Guarded) |

---

## 🤖 Honest AI-Usage Note


- **AI Tools**: chatGPT used for discussion of feature and UI,what type of error occured  , tuning Zod schemas.
- **Groq LLM**: Used as the core AI engine (`openai/gpt-oss-20b` model) to transform unstructured user ingredient inputs and craving preferences into validated structured JSON.
- **Original Architecture & Code**: All state management (`useIngredients`, `useRecipeGeneration`), UI responsive rules, marquee animations, and error handling boundaries were designed and verified specifically for this project.

---

## ⏱️ Time Spent & Known Limitations

- **Time Spent**: ~9.5 hours (Planning data schema, React scaffolding, Groq backend proxy setup, Zod validation layer, and error resilience testing).
- **Known Limitations**:
  - Image thumbnails for custom user-added ingredients fallback to emojis when exact external URLs are unavailable.
  - Rate limits depend on Groq free-tier quotas (handled gracefully by our `ErrorState` UI).
