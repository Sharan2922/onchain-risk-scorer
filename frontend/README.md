# Risk Chain Analyser – Frontend

This is the frontend of the **Risk Chain Analyser** project – a Web3 risk analysis platform that fetches real blockchain data and evaluates token or wallet risk using AI-powered backend services.

---

## 🚀 Features
- Search for any ERC-20 token or Ethereum wallet address.
- Fetch **real-time blockchain data** (via Etherscan API).
- AI-powered risk scoring and insights.
- Dashboard view for previously analyzed addresses.
- Modern UI built with **React + Vite + Tailwind CSS**.

---

## 📂 Project Structure
```

frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── hooks/              # Wallet connection hooks
│   ├── services/           # API services for backend calls
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main app entry
│   └── main.tsx            # Vite entry point
├── index.html
├── package.json
└── vite.config.ts

````

---

## ⚙️ Prerequisites
Before starting, ensure you have:
- **Node.js** ≥ 18
- **npm** or **yarn**
- Backend API running locally or hosted

---

## 🔧 Setup & Installation
1. Clone the repository:
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/risk-chain-analyser-frontend.git
cd frontend
````

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
```

*(Replace `localhost:5000` with your hosted backend URL when in production.)*

4. Start development server:

```bash
npm run dev
```

---

## 📦 Build for Production

```bash
npm run build
```

The compiled output will be inside the `dist/` folder.

---

## 🌐 Deployment

We recommend:

* **Frontend** → [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
* **Backend** → [Render](https://render.com) or [Railway](https://railway.app)

---

## 📝 License

MIT License

```

---

## **2️⃣ Why we can’t host backend + frontend together on Vercel**
Vercel is designed for **static frontends** (React, Next.js) and **serverless functions**, not for **persistent Express.js servers**.  

**Problems if you try to host backend on Vercel:**
- Express server must be converted into **API routes** (serverless functions).
- No persistent WebSocket/long-running process support.
- Free tier has **cold start delays** and execution time limits (max 10s).
- Your backend in its current form **listens on a port** — Vercel serverless doesn’t allow that.

---

## **3️⃣ Best Alternative**
- Host **backend** on **Render** (free tier) → gets you a public API URL like:
```

[https://risk-analyser-backend.onrender.com](https://risk-analyser-backend.onrender.com)

````
- Host **frontend** on **Vercel** → fetch data from above API URL.
- This way **anyone** can test it with real blockchain data — no demo data.

---

## **4️⃣ Changing Browser Tab Name**
Right now your tab says *"Web3 Frontend Application"* because of the `<title>` tag in **`index.html`**.

### Update it:
`frontend/index.html`
```html
<title>Risk Chain Analyser</title>
````

Save, restart `npm run dev`, and your browser tab will now show **Risk Chain Analyser**.

---

