# 🚀 Nexus Intelligence Dashboard

An AI-powered competitor intelligence platform that analyzes startups, competitors, feature gaps, market opportunities, and generates actionable business insights using OpenAI.

---

## 🌐 Live Deployment

- **Frontend (Vercel):**  
  https://nexus-7dfb.vercel.app/

- **Backend (Render):**  
  https://nexus-65vm.onrender.com/

---

## 📌 Project Overview

Nexus Intelligence Dashboard is a full-stack AI SaaS-style tool that helps users:

- Analyze competitor landscapes
- Generate feature comparison matrices
- Identify market opportunities
- Discover potential leads
- Get AI-driven strategic recommendations
- Visualize competitor performance insights

---

## 🧠 Key Features

### 📊 Competitor Intelligence
- 5 AI-generated competitors per query
- Pricing, positioning, audience insights
- Strengths & weaknesses breakdown

### ⚔️ Feature Matrix
- Side-by-side feature comparison
- Our product vs competitors
- AI-generated feature gap analysis

### 📈 Analytics Dashboard
- Confidence scoring system
- Market distribution insights
- Feature gap trends visualization

### 💡 AI Recommendations
- Top features to build (exactly 5)
- Market opportunities (exactly 5)
- Risk analysis (exactly 3)

### 🎯 Lead Generation
- 5 potential business leads
- Decision makers included
- Email + LinkedIn suggestions

---

## 🏗️ Architecture Overview

### 🖥️ Frontend (React + Vite + TypeScript)
- Built with React + TypeScript
- UI components for dashboard visualization
- Feature Matrix, Competitor Cards, Charts, Leads panels
- State management using React hooks
- API integration via fetch to backend

### ⚙️ Backend (Node.js + Express)
- Express REST API
- OpenAI GPT-4o-mini integration
- Single `/analyze` endpoint
- Generates structured JSON response
- Strict prompt engineering for consistent output

### 🔗 API Flow
Frontend (Vercel)
↓
POST /analyze
↓
Backend (Render)
↓
OpenAI API (GPT-4o-mini)
↓
Structured JSON Response
↓
Frontend Dashboard Rendering



---

## 📡 API Endpoint

### POST `/analyze`

Request:
```json
{
  "query": "AI social media marketing tool"
}

```
Response
```
{
  "competitors": [],
  "featureMatrix": [],
  "comparison": {},
  "recommendations": {},
  "leads": []
}
```
Setup Instructions
 Frontend Setup
 ```
cd frontend
npm install
npm run dev
```
Build:
```
npm run build
```

Backend Setup
```
cd backend
npm install
```
Run locally:
```
npm run dev
```
🔐 Environment Variables (Backend)

Create .env file:
```
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```
📦 Deployment Details
Frontend (Vercel)
Framework: Vite React
Output Directory: dist
API Base URL: Render backend
Backend (Render)
Runtime: Node.js
Start Command: node dist/server.js (or ts-node in dev)
Environment variables configured in Render dashboard
🧾 Assumptions Made
AI-generated data is synthetic (not real market data)
Competitor insights are simulated using GPT model
Leads are AI-generated and not real contacts
Feature matrix is derived from comparative reasoning, not external datasets
Focus is on demonstration of AI intelligence layer, not production data accuracy
⚠️ Limitations
No real-time market data integration
AI outputs may vary per request
Feature matrix depends on prompt consistency
Requires stable OpenAI API access
🧠 Future Improvements
Real-time scraping of competitor data
Database integration (PostgreSQL/MongoDB)
User authentication system
Saved reports per user
Export dashboards as PDF (advanced formatting)
SaaS monetization layer


Built as a full-stack AI SaaS demo project showcasing:

AI system design
Full-stack React + Node architecture
OpenAI integration
Dashboard UI engineering
📌 Submission Links
Live Application: https://nexus-7dfb.vercel.app/
Backend API: https://nexus-65vm.onrender.com/
GitHub Repository: 
🚀 Final Notes

This project demonstrates AI-driven competitor analysis, structured output engineering, and full-stack deployment using modern web technologies.







