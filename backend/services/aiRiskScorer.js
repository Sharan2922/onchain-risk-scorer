const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/score', async (req, res) => {
  try {
    const { transactions } = req.body;

    if (!transactions || transactions.length === 0) {
      return res.status(400).json({ error: "No transactions provided" });
    }

    const prompt = `Analyze the following Ethereum transactions and give a risk score from 0 to 100 with reasoning:\n${JSON.stringify(transactions)}`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200
    });

    res.json({ riskAnalysis: aiResponse.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
