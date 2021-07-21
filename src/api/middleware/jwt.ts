import jwt from 'express-jwt';
import config from "@config/global";

function authJwt() {
    const options = {
        secret: config.jwt.secret,
        algorithms: ['HS256']
    };
    const paths = ['/api/auth/login', '/api/auth/signin'];

    return jwt(options).unless({ path: paths });
}

export default authJwt;