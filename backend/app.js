const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const blockchainRoutes = require('./services/blockchainData');
const aiRoutes = require('./services/aiRiskScorer');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('On-Chain Risk Scorer API is running...');
});

app.use('/api/blockchain', blockchainRoutes);
app.use('/api/ai', aiRoutes);

module.exports = app;
