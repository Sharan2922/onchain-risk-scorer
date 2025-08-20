
# 🛡️ On-Chain Risk Scorer

An **AI + Blockchain powered platform** to analyze the **risk of tokens, wallets, and smart contracts** in real time.  
Built with **React (frontend), Express.js (backend), and AI APIs** for scoring.  

---

## 🚀 Features
- Analyze any **ERC-20 token or wallet address**  
- AI-powered **risk scoring** (Low, Medium, High, Critical)  
- Real-time **on-chain data** fetch from blockchain explorers  
- Portfolio dashboard for multiple addresses  
- Fully transparent backend + frontend separation  

---

## 📂 Project Structure
```

onchain-risk-scorer/
│── frontend/   # React + Vite (UI hosted on Vercel)
│── backend/    # Express.js API server (hosted on Render)

````

---

## 🛠️ Local Development

### 1. Clone repo
```bash
git clone https://github.com/<your-username>/onchain-risk-scorer.git
cd onchain-risk-scorer
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` in `backend/`:

```env
PORT=5000
ETHERSCAN_API_KEY=your_etherscan_key
OPENAI_API_KEY=your_openai_key   # or Gemini API key
```

Run backend:

```bash
npm run dev
```

Server should run on:
👉 `http://localhost:5000`

Test API:

```bash
curl http://localhost:5000/api/test
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` in `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

👉 Open [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deployment

### 🔹 Backend → Render

Deployed at:
👉 **[https://onchain-risk-scorer.onrender.com](https://onchain-risk-scorer.onrender.com)**

✅ Test endpoint:

```
https://onchain-risk-scorer.onrender.com/api/test
```

---

### 🔹 Frontend → Vercel

Deployed at:
👉 **[https://onchain-risk-scorer.vercel.app/](https://onchain-risk-scorer.vercel.app/)**

Configured with:

```env
VITE_BACKEND_URL=https://onchain-risk-scorer.onrender.com
```

---

## ✅ How to Test

1. Open the frontend:
   👉 [https://onchain-risk-scorer.vercel.app/](https://onchain-risk-scorer.vercel.app/)

2. Enter a token contract address, e.g. **USDC (Ethereum Mainnet)**

   ```
   0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   ```

3. Click **Analyze**

4. You should see a risk score returned from backend.

If you see **“Failed to analyze risk”**, check:

* Backend URL in frontend `.env` is correct
* Backend is running and accessible
* CORS config allows your Vercel domain

---

## 🧪 Example API Calls

### Get Health Check

```
GET /api/test
```

Response:

```json
{ "message": "✅ Backend is live and ready!" }
```

### Analyze Risk

```
POST /api/analyze-risk
{
  "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
}
```

Response:

```json
{
  "address": "0xA0b8...6eB48",
  "score": 42,
  "level": "medium",
  "recommendations": ["Diversify holdings", "Monitor liquidity pools"]
}
```

---

## 📌 Tech Stack

* **Frontend:** React + Vite + Tailwind + Framer Motion
* **Backend:** Node.js + Express + Axios
* **Blockchain Data:** Etherscan API
* **AI:** OpenAI GPT / Google Gemini
* **Hosting:** Render (backend), Vercel (frontend)

---


Do you also want me to **add screenshots (frontend UI + API test example)** into this README so it looks stronger for your CV/GitHub?
```
