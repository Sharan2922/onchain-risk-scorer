import axios from 'axios';
import { RiskScore, TokenData, PortfolioRisk, TransactionRisk } from '../types/risk';

// Set backend API URL directly
const API_BASE_URL = 'http://localhost:5000'; // Backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const riskApi = {
  // Analyze token/address risk
  analyzeRisk: async (address: string): Promise<RiskScore> => {
    const response = await api.post('/api/analyze-risk', { address });
    return response.data;
  },

  // Get token data
  getTokenData: async (address: string): Promise<TokenData> => {
    const response = await api.get(`/api/token/${address}`);
    return response.data;
  },

  // Analyze portfolio risk
  analyzePortfolio: async (addresses: string[]): Promise<PortfolioRisk> => {
    const response = await api.post('/api/analyze-portfolio', { addresses });
    return response.data;
  },

  // Get transaction risks
  getTransactionRisks: async (address: string): Promise<TransactionRisk[]> => {
    const response = await api.get(`/api/transactions/${address}/risks`);
    return response.data;
  },
};
