const express = require('express'); 
const signUpRouter = express.Router();

const { signUp } = require('../controller/signUpController');

signUpRouter.post('/api/SignUp', signUp);

module.exports = signUpRouter;