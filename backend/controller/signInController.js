const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Voters = require('../models/voter');

exports.getSignIn = (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'about2.html'));
};

exports.signIn = [
  check('email')
  .normalizeEmail()
  .isEmail()
  .withMessage('Valid email is required'),

  check('password')
  .trim()
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
  .withMessage('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render('/api/SignIn', { 
          errors: errors.mapped(),
          formData: { email }
        });
      }

      const voter =  await Voters.findOne({ email });
      if (!voter) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, voter.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      const Secret_Key = 'univote';
      const userPayload = { email, password };
      const token = jwt.sign(userPayload, Secret_Key, { expiresIn: '7d' });
      
      res.cookie('token', token, { 
        httpOnly: true, 
        secure: false, 
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 
      });

      res.redirect('/api/Homepage');

      console.log('Received:', email, password); 

    } catch (error) {
      console.error('SignIn error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
] 
