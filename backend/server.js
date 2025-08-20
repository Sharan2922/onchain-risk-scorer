import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(express.json());

// Allow frontend (localhost + Vercel) to call backend
app.use(cors({
  origin: [
    "http://localhost:5173",        // Vite dev
    /\.vercel\.app$/                // any deployed Vercel frontend
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

// Root test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

// Health check
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is live and ready!" });
});

// Simple token fetch (using Etherscan for now)
app.get("/api/token/:address", async (req, res) => {
  try {
    const tokenAddress = req.params.address;
    const apiKey = process.env.ETHERSCAN_API_KEY;

    const url = `https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${tokenAddress}&apikey=${apiKey}`;
    const response = await axios.get(url);

    if (response.data.status !== "1") {
      return res.status(404).json({ error: "Token not found" });
    }

    res.json(response.data.result[0]);
  } catch (err) {
    console.error("Error fetching token:", err.message);
    res.status(500).json({ error: "Failed to fetch token" });
  }
});

// Fake analyze risk endpoint for testing
app.post("/api/analyze-risk", async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    // Temporary mock response
    res.json({
      address,
      score: Math.floor(Math.random() * 100),
      level: "medium",
      recommendations: ["Diversify holdings", "Monitor liquidity pools"]
    });
  } catch (err) {
    console.error("Error analyzing risk:", err.message);
    res.status(500).json({ error: "Failed to analyze risk" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
