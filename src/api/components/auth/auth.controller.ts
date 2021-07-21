import { Request, Response } from 'express';
import logger from '@config/logger';
import config from "@config/global";
import jwt from 'jsonwebtoken';

//POST - SignIn - Returns new token
var signin = function (req: Request, res: Response) {
    logger.info("POST /signin/");
    if (req.body.user === 'test' && req.body.password === 'pass') {
        const payload = {
            user: req.body.user,
            admin: false
        }
        const token = jwt.sign(payload, config.jwt.secret);
        res.json({
            success: true,
            result: token
        })
    } else {
        res.json({
            success: false,
            message: 'Wrong username or password'
        })
    }
};

//POST - Login - Check valid token
var login = function (req: Request, res: Response) {
    logger.info("POST /login");
    res.send('You are loged in');
};

module.exports = {
    signin: signin,
    login: login
}