const express = require('express');
const path = require('path');

exports.getHomepage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'homepage.html'));
}