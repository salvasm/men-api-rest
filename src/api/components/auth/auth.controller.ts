import { Request, Response } from 'express';
import logger from '@config/logger';
import config from "@config/global";
import jwt from 'jsonwebtoken';
import userModel from '../user/user.model';
import bcrypt from 'bcrypt';

//POST - Authenticate - Retrieves token to registered user
var authentication = function (req: Request, res: Response) {
    logger.info("POST /auth/authentication");
    userModel.findOne({username: req.body.user}, function (err: any, result: any) {
        if (result && bcrypt.compareSync(req.body.password, result.password)) {
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
    }).select('password');
};

module.exports = {
    authentication: authentication
}