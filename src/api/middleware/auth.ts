//const jwt = require('express-jwt');
const jwt = require('express-jwt');
import config from "@config/global";

function auth() {
    const secret = config.jwt.secret;

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
