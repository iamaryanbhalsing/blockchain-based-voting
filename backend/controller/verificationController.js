const express = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const Otp = require('../models/Otp');
const regVoters = require('../models/registrationModel');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'univote.tech@gmail.com',
    pass: 'hjzwyhefqjubxueu' // Use App Password (not your Gmail password)
  }
});

let emailStored = null; // Variable to store the email temporarily

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  emailStored = email; // Store the email temporarily

  const userRegistered = await regVoters.findOne({ email });
  if (!userRegistered) {
    return res.status(400).json({ message: 'User not registered' });
  }

  // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

  const mailOptions = {
    from: 'univote.tech@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`
  };

  // Hash the OTP before saving it to the database
  const hashedOtp = await bcrypt.hash(otp, 12);

  try {
    await transporter.sendMail(mailOptions);
    await Otp.create({ email, otp: hashedOtp });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
}

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const savedOtp = await Otp.findOne({ email });
    if (!savedOtp) {
      await Otp.deleteOne({ _id: savedOtp._id });
      return res.status(400).json({ message: 'Invalid Otp Or Otp Expired' });
    }

    const now = Date.now();
    const otpAge = now - savedOtp.createdAt.getTime();

    if (otpAge > 60 * 1000) {
      await Otp.deleteOne({ email }); // Clean up
      return res.status(400).json({ message: 'OTP expired' });
    }

    const isMatch = await bcrypt.compare(otp, savedOtp.otp);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    await Otp.deleteOne({ _id: savedOtp._id }); // Delete OTP after verification

    req.session.email = email;    

    res.status(200).json({ message: 'OTP verified successfully', redirect: '/vote.html' }); 
  }
  catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
}

exports.resendOtp = async (req, res) => {
  const emailRegisered = await regVoters.findOne({ email: emailStored });
  if (!emailRegisered) {
    return res.status(400).json({ message: 'User not registered' });
  }
  await Otp.deleteMany({ email: emailStored }); // Delete any existing OTPs for the email
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const hashedOtp = await bcrypt.hash(otp, 12); // Hash the OTP before saving it to the database

  const mailOptions = {
    from: 'univote.tech@gmail.com',
    to: emailStored,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`
  };
  try {
    await transporter.sendMail(mailOptions);
    await Otp.create({ email: emailStored, otp: hashedOtp });

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }  
}