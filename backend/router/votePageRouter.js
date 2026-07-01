const express = require('express');
const votePageRouter = express.Router();

const authenticate = require('../authenticate/jwtCheck');
const { checkWallet,votePageHandler } = require('../controller/votePageController');

votePageRouter.post('/api/CheckWallet', authenticate, checkWallet);


module.exports = votePageRouter;