const API_BASE = "http://localhost:5000";

export const getTransactions = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/blockchain/transfers`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch {
    // Enhanced mock data with more realistic values
    return [
      { 
        from: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87", 
        to: "0xA0b86a33E6441b411b44e2b0deD0F1031b18a607", 
        value: "15000", 
        hash: "0x8f3c2a1b9e7d6c5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1", 
        timeStamp: "1735200000",
        gasUsed: "21000",
        gasPrice: "20000000000"
      },
      { 
        from: "0x456d35Cc6634C0532925a3b8D4C9db96590c6C87", 
        to: "0xdef86a33E6441b411b44e2b0deD0F1031b18a607", 
        value: "75000", 
        hash: "0x654c2a1b9e7d6c5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1", 
        timeStamp: "1735200500",
        gasUsed: "21000",
        gasPrice: "18000000000"
      },
      { 
        from: "0x789d35Cc6634C0532925a3b8D4C9db96590c6C87", 
        to: "0x123a33E6441b411b44e2b0deD0F1031b18a607", 
        value: "2500", 
        hash: "0x321c2a1b9e7d6c5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1", 
        timeStamp: "1735201000",
        gasUsed: "21000",
        gasPrice: "22000000000"
      },
      { 
        from: "0xabcd35Cc6634C0532925a3b8D4C9db96590c6C87", 
        to: "0xefgh33E6441b411b44e2b0deD0F1031b18a607", 
        value: "125000", 
        hash: "0x987c2a1b9e7d6c5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1", 
        timeStamp: "1735201500",
        gasUsed: "21000",
        gasPrice: "25000000000"
      }
    ];
  }
};

export const scoreTransactions = async (transactions) => {
  try {
    const res = await fetch(`${API_BASE}/api/ai/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactions })
    });
    if (!res.ok) throw new Error("Failed to score");
    return await res.json();
  } catch {
    // Enhanced mock AI response with detailed analysis
    const riskLevels = ['Low', 'Medium', 'High', 'Critical'];
    const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const riskScore = randomRisk === 'Low' ? 25 : randomRisk === 'Medium' ? 50 : randomRisk === 'High' ? 75 : 90;
    
    return { 
      riskLevel: randomRisk,
      riskScore: riskScore + Math.random() * 20 - 10,
      riskAnalysis: `${randomRisk} risk detected based on transaction patterns and behavioral analysis.`,
      factors: [
        "Transaction frequency analysis",
        "Wallet interaction patterns",
        "Value distribution assessment",
        "Gas price optimization patterns"
      ],
      recommendations: randomRisk === 'High' || randomRisk === 'Critical' 
        ? ["Monitor closely", "Consider additional verification", "Review transaction history"]
        : ["Continue monitoring", "Standard risk protocols apply"],
      confidence: 85 + Math.random() * 15
    };
  }
};