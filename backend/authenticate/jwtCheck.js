const express = require('express');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/api/SignIn'); 
    }

    try {
        const decoded = jwt.verify(token, 'univote');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticate;
