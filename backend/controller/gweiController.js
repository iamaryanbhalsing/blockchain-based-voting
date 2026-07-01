const express = require('express');

const ETHERSCAN_API_KEY = 'EYGCV35PFHEK6DT4SANUSHVRY9D8YBIMPH';

exports.getGwei = async (req, res) => {
  try {
    const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  }  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch gas prices' });
  }
};
 