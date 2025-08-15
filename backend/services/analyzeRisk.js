import express from 'express';
import axios from 'axios';

const router = express.Router();

// --- helpers ---
const toNumber = (v, d = 0) => (typeof v === 'number' ? v : Number(v ?? d) || d);

function scoreToLevel(score) {
  if (score <= 25) return 'low';
  if (score <= 50) return 'medium';
  if (score <= 75) return 'high';
  return 'critical';
}

// Try CoinGecko for symbol/name/market data
async function fetchTokenFromCG(address) {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`;
    const { data } = await axios.get(url, { timeout: 8000 });

    return {
      symbol: data?.symbol?.toUpperCase() || 'N/A',
      name: data?.name || 'Unknown',
      price: toNumber(data?.market_data?.current_price?.usd),
      marketCap: toNumber(data?.market_data?.market_cap?.usd),
      volume24h: toNumber(data?.market_data?.total_volume?.usd),
      priceChange24h: toNumber(data?.market_data?.price_change_percentage_24h),
      // placeholders for fields your UI expects
      liquidity: toNumber(data?.market_data?.total_volume?.usd), // rough proxy
      holders: 0,
    };
  } catch (_) {
    return null;
  }
}

// Optional: light Etherscan lookups (needs API key)
async function tryEtherscan(address) {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  if (!apiKey) return {};

  try {
    // Quick sanity: get last few token tx for activity signal
    const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${address}&page=1&offset=10&sort=desc&apikey=${apiKey}`;
    const { data } = await axios.get(url, { timeout: 8000 });
    if (data?.status === '1') {
      return { recentTokenTxCount: data.result.length };
    }
    return { recentTokenTxCount: 0 };
  } catch {
    return {};
  }
}

// POST /api/analyze-risk  { address }
router.post('/analyze-risk', async (req, res) => {
  try {
    const { address } = req.body || {};
    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'address is required' });
    }

    // Get real token info (best-effort)
    const cg = await fetchTokenFromCG(address);
    const es = await tryEtherscan(address);

    const tokenSymbol = cg?.symbol || 'UNKNOWN';
    const tokenName = cg?.name || 'Unknown Token';

    // Very simple heuristic scoring so the UI can render something real:
    // - Higher market cap & volume => lower risk
    // - No market data => higher risk
    const marketCap = toNumber(cg?.marketCap);
    const vol = toNumber(cg?.volume24h);
    const hasData = cg !== null;

    let base = 80;
    if (hasData) {
      if (marketCap > 1_000_000_000) base = 20;
      else if (marketCap > 100_000_000) base = 35;
      else if (marketCap > 10_000_000) base = 50;
      else base = 65;

      // adjust by volume a bit
      if (vol > 50_000_000) base -= 10;
      else if (vol < 500_000) base += 10;
    }

    // Tiny nudge for recent activity
    if (es.recentTokenTxCount >= 8) base -= 5;
    if (es.recentTokenTxCount <= 1) base += 5;

    const overallScore = Math.max(0, Math.min(100, base));
    const riskLevel = scoreToLevel(overallScore);

    const response = {
      address,
      tokenSymbol,
      tokenName,
      overallScore,
      riskLevel,
      factors: {
        liquidityRisk: 100 - Math.min(100, vol / 1_000_000 * 20), // playful heuristic
        volatilityRisk: Math.abs(toNumber(cg?.priceChange24h)) * 2, // % change
        contractRisk: hasData ? 40 : 80,
        marketManipulationRisk: vol < 250_000 ? 70 : 30,
        rugPullRisk: hasData ? 30 : 70,
      },
      aiInsights: [
        hasData
          ? 'Live market data found from CoinGecko.'
          : 'No market data found; treat with caution.',
        es.recentTokenTxCount >= 5
          ? 'Active on-chain token transfers recently.'
          : 'Limited recent token transfer activity.',
      ],
      lastUpdated: new Date().toISOString(),
      confidence: hasData ? 85 : 50,
    };

    res.json(response);
  } catch (err) {
    console.error('analyze-risk error:', err?.message || err);
    res.status(500).json({ error: 'Failed to analyze risk' });
  }
});

// GET /api/token/:address  -> token details for your Token Information panel
router.get('/token/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const cg = await fetchTokenFromCG(address);
    if (!cg) return res.status(404).json({ error: 'Token not found on CoinGecko' });

    res.json({
      address,
      symbol: cg.symbol,
      name: cg.name,
      price: cg.price,
      marketCap: cg.marketCap,
      volume24h: cg.volume24h,
      priceChange24h: cg.priceChange24h,
      liquidity: cg.liquidity,
      holders: cg.holders,
    });
  } catch (err) {
    console.error('token endpoint error:', err?.message || err);
    res.status(500).json({ error: 'Failed to fetch token data' });
  }
});

// OPTIONAL: make portfolio + tx risk endpoints return something valid so the Dashboard works

router.post('/analyze-portfolio', async (req, res) => {
  const { addresses } = req.body || {};
  if (!Array.isArray(addresses) || addresses.length === 0) {
    return res.status(400).json({ error: 'addresses is required' });
  }
  try {
    const results = await Promise.all(
      addresses.map(a =>
        axios.post(`${req.protocol}://${req.get('host')}/api/analyze-risk`, { address: a })
          .then(r => r.data)
          .catch(() => null)
      )
    );
    const valid = results.filter(Boolean);

    const avg = valid.length
      ? valid.reduce((s, r) => s + r.overallScore, 0) / valid.length
      : 0;

    const dist = { low: 0, medium: 0, high: 0, critical: 0 };
    valid.forEach(r => { dist[r.riskLevel] += 1; });
    const total = valid.length || 1;
    Object.keys(dist).forEach(k => { dist[k] = (dist[k] / total) * 100; });

    res.json({
      totalValue: valid.length * 1000,
      averageRisk: avg,
      riskDistribution: dist,
      recommendations: [
        'Diversify into assets with lower risk scores.',
        'Set alerts for unusual volume spikes.',
        'Revisit assets with limited market data.',
      ],
    });
  } catch (err) {
    console.error('analyze-portfolio error:', err?.message || err);
    res.status(500).json({ error: 'Failed to analyze portfolio' });
  }
});

// GET /api/transactions/:address/risks  -> keep simple for now
router.get('/transactions/:address/risks', async (req, res) => {
  res.json([]); // You can expand this later to wallet tx analysis
});

export default router;
