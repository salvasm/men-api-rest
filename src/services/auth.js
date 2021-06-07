const config = require('../config/global');
const jwt = require('jsonwebtoken');

var generateAccessToken = (req, res) => {
    return jwt.sign(req.body.username, config.secret, { expiresIn: '1h' });
};

module.exports = {
    generateAccessToken: generateAccessToken
};