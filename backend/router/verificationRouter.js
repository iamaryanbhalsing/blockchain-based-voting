const express = require('express');
const verificationRouter = express.Router();

const authenticate = require('../authenticate/jwtCheck');
const { sendOtp, verifyOtp, resendOtp } = require('../controller/verificationController');

verificationRouter.post('/api/Send-Otp',authenticate, sendOtp);
verificationRouter.post('/api/Verify-Otp', authenticate, verifyOtp);
verificationRouter.get('/api/Resend-Otp', authenticate, resendOtp); 

module.exports = verificationRouter;