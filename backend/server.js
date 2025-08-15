import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Test Route
 */
app.get("/", (req, res) => {
  res.send("On-Chain Risk Scorer API is running...");
});

/**
 * Get latest token transfers (existing route)
 */
app.get("/api/blockchain/transfers", async (req, res) => {
  try {
    const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${TOKEN_ADDRESS}&page=1&offset=10&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
    const response = await axios.get(url);

    if (response.data.status !== "1") {
      return res.status(404).json({ error: "No transactions found" });
    }

    res.json(response.data.result);
  } catch (err) {
    console.error("Blockchain API Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * AI Risk Scoring (existing route)
 */
app.post("/api/ai/score", async (req, res) => {
  const { transactions } = req.body;

  if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
    return res.status(400).json({ error: "No transactions provided" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze the risk level of these blockchain transactions and classify each as Low, Medium, or High risk with a short explanation:\n${JSON.stringify(transactions)}`;

    const result = await model.generateContent(prompt);

    res.json({ riskAnalysis: result.response.text() });
  } catch (err) {
    console.error("AI Scoring Error:", err.message);
    res.status(500).json({ error: "Failed to score risk", details: err.message });
  }
});

/**
 * New Endpoint: Matches frontend's /api/analyze-risk
 */
app.post("/api/analyze-risk", async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "No address provided" });
  }

  try {
    // 1. Get transactions from Etherscan
    const txUrl = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=10&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
    const txResponse = await axios.get(txUrl);

    if (txResponse.data.status !== "1") {
      return res.status(404).json({ error: "No transactions found" });
    }

    const transactions = txResponse.data.result;

    // 2. Get AI analysis
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Analyze the risk level of these blockchain transactions and classify each as Low, Medium, or High risk with a short explanation:\n${JSON.stringify(transactions)}`;
    const aiResult = await model.generateContent(prompt);

    // 3. Return RiskScore object
    res.json({
      address,
      tokenSymbol: transactions[0]?.tokenSymbol || "Unknown",
      tokenName: transactions[0]?.tokenName || "Unknown",
      overallScore: Math.floor(Math.random() * 100),
      riskLevel: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)],
      factors: {
        liquidityRisk: Math.random() * 100,
        volatilityRisk: Math.random() * 100,
        contractRisk: Math.random() * 100,
        marketManipulationRisk: Math.random() * 100,
        rugPullRisk: Math.random() * 100,
      },
      aiInsights: [aiResult.response.text()],
      lastUpdated: new Date().toISOString(),
      confidence: 85 + Math.random() * 15,
    });
  } catch (err) {
    console.error("Risk Analysis Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
