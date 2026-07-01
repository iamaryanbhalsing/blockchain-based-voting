const express = require('express');
const Web3 = require("web3");

const regVoters = require('../models/registrationModel');
require("dotenv").config();

let storedWalletAddress = '';

exports.checkWallet = async (req, res) => {
  const { walletAddress } = req.body;
  const email = req.session.email;
  storedWalletAddress = walletAddress.toLowerCase(); // Store the wallet address in a variable

  try {
    const voter = await regVoters.findOne({ wallet: storedWalletAddress, email });

    if (!voter) {
      return res.status(404).json({ message: "Wallet address not found" });
    }
    return res.status(200).json({ message: "Wallet address found" });
  } catch (error) {
    console.error("Error checking wallet address:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



