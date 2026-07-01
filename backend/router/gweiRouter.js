const express = require('express');
const gweiRouter = express.Router();

const gweiController = require('../controller/gweiController');

gweiRouter.get('/api/Gwei', gweiController.getGwei);

module.exports = gweiRouter;