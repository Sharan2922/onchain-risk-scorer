const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/transfers', async (req, res) => {
  try {
    const { ETHERSCAN_API_KEY, TOKEN_CONTRACT } = process.env;
    const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${TOKEN_CONTRACT}&page=1&offset=10&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
    
    const { data } = await axios.get(url);

    if (data.status !== "1") {
      return res.status(400).json({ error: "No transactions found" });
    }

    res.json(data.result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
