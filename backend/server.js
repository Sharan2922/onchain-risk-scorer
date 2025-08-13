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
  

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
