const express = require('express');
const homepageRouter = express.Router();
const authenticate = require('../authenticate/jwtCheck');
const { getHomepage } = require('../controller/homepageController');

homepageRouter.get('/api/Homepage', authenticate, getHomepage);

module.exports = homepageRouter;