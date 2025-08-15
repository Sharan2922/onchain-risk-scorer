export interface RiskScore {
    address: string;
    tokenSymbol?: string;
    tokenName?: string;
    overallScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    factors: {
      liquidityRisk: number;
      volatilityRisk: number;
      contractRisk: number;
      marketManipulationRisk: number;
      rugPullRisk: number;
    };
    aiInsights: string[];
    lastUpdated: string;
    confidence: number;
  }
  
  export interface TokenData {
    address: string;
    symbol: string;
    name: string;
    price: number;
    marketCap: number;
    volume24h: number;
    priceChange24h: number;
    liquidity: number;
    holders: number;
  }
  
  export interface PortfolioRisk {
    totalValue: number;
    averageRisk: number;
    riskDistribution: {
      low: number;
      medium: number;
      high: number;
      critical: number;
    };
    recommendations: string[];
  }
  
  export interface TransactionRisk {
    hash: string;
    from: string;
    to: string;
    value: number;
    riskScore: number;
    riskFactors: string[];
    timestamp: number;
  }