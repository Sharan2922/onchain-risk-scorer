import axios from 'axios';
import { RiskScore, TokenData, PortfolioRisk, TransactionRisk } from '../types/risk';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://your-backend-api.com'
    : 'http://localhost:5000');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export const riskApi = {
  analyzeRisk: async (address: string): Promise<RiskScore> => {
    try {
      const { data } = await api.post('/api/analyze-risk', { address });
      return data;
    } catch (error) {
      console.error('Error analyzing risk:', error);
      throw error; // let UI show the toast — no more silent "DEMO"
    }
  },

  getTokenData: async (address: string): Promise<TokenData> => {
    try {
      const { data } = await api.get(`/api/token/${address}`);
      return data;
    } catch (error) {
      console.error('Error fetching token data:', error);
      throw error;
    }
  },

  analyzePortfolio: async (addresses: string[]): Promise<PortfolioRisk> => {
    try {
      const { data } = await api.post('/api/analyze-portfolio', { addresses });
      return data;
    } catch (error) {
      console.error('Error analyzing portfolio:', error);
      return {
        totalValue: 0,
        averageRisk: 0,
        riskDistribution: { low: 0, medium: 0, high: 0, critical: 0 },
        recommendations: [],
      };
    }
  },

  getTransactionRisks: async (_address: string): Promise<TransactionRisk[]> => {
    try {
      // not strictly needed for now — returns empty array from backend
      return [];
    } catch (error) {
      console.error('Error fetching transaction risks:', error);
      return [];
    }
  },
};
