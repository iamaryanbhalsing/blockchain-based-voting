const express = require("express");
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const regVoters = require('../models/registrationModel');
const Otp = require('../models/Otp');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'univote.tech@gmail.com',
    pass: 'hjzwyhefqjubxueu' // Use App Password (not your Gmail password)
  }
});

let storedEmail = '';
let storedWalletAddress = '';

exports.sendRegOtp = async (req, res) => {
  const { email, walletAddress } = req.body;
  storedEmail = email;
  storedWalletAddress = walletAddress.toLowerCase();

  // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const hashedOtp = await bcrypt.hash(otp, 12); // Hash the OTP before saving it to the database  

  const mail = {
    from: 'univote.tech@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`
  };
  
  try {

    await transporter.sendMail(mail);
    await Otp.create({ email, otp: hashedOtp });
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
}

exports.verifyRegOtp = async (req, res) => {
  const { otp } = req.body;

  try {
    const savedOtp = await Otp.findOne({ email: storedEmail });
    if (!savedOtp) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    const now = Date.now();
    const otpAge = now - savedOtp.createdAt.getTime();

    if (otpAge > 60 * 1000) {
      await Otp.deleteOne({ email: storedEmail }); // Clean up
      return res.status(400).json({ message: 'OTP expired' });
    }
    
    const isMatch = await bcrypt.compare(otp, savedOtp.otp);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    await Otp.deleteOne({ _id: savedOtp._id }); // Delete OTP after verification

    const alreadyRegistered = await regVoters.findOne({ email: storedEmail, wallet: storedWalletAddress });
    if (alreadyRegistered) {
      return res.status(400).json({ message: 'User already registered' });
    }
    await regVoters.create({ email: storedEmail, wallet: storedWalletAddress, hasVoted: false });
    res.status(200).json({ message: 'OTP Verified! Redirecting to homepage', redirect: '/homepage.html' });
  }
  catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
}

exports.resendOtp = async (req, res) => {
  
  await Otp.deleteMany({ email: storedEmail }); // Delete any existing OTPs for the email
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const hashedOtp = await bcrypt.hash(otp, 12); // Hash the OTP before saving it to the database

  const mailOptions = {
    from: 'univote.tech@gmail.com',
    to: storedEmail,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`
  };
  try {
    await transporter.sendMail(mailOptions);
    await Otp.create({ email: storedEmail, otp: hashedOtp });

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }  
}