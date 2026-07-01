const express = require('express'); 
const registrationRouter = express.Router();

const authenticate = require('../authenticate/jwtCheck');
const { sendRegOtp,verifyRegOtp, resendOtp } = require('../controller/registrationController');

registrationRouter.post('/api/Register', authenticate, sendRegOtp);
registrationRouter.post('/api/VerifyReg-Otp',authenticate, verifyRegOtp);
registrationRouter.get('/api/ResendReg-Otp', authenticate, resendOtp);

module.exports = registrationRouter;