//const jwt = require('express-jwt');
const jwt = require('express-jwt');
const config = require('../../config/global');

function auth() {
    const { secret } = config;

    return jwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // Public routes
            '/api/user/login',
            '/api/user'
        ]
    });
}

module.exports = {
    auth
};
