import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRiskRoute from './services/analyzeRisk.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Vite/React dev
  credentials: false
}));

app.get('/', (_req, res) => res.send('On-Chain Risk Scorer API is running...'));

// mount routes
app.use('/api', analyzeRiskRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
