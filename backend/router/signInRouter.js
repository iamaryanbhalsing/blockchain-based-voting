const express = require('express');
const signInRouter = express.Router();
const { signIn, getSignIn }= require('../controller/signInController');
const authenticate = require('../authenticate/jwtCheck');

signInRouter.get('/api/SignIn', getSignIn); 
signInRouter.post('/api/SignIn', signIn);

module.exports = signInRouter;