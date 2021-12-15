import { Request, Response } from 'express';
import logger from '@config/logger';
import config from "@config/global";
import jwt from 'jsonwebtoken';
import userModel from '../user/user.model';
import bcrypt from 'bcrypt';
import httpErrorHandler from '@handlers/globalErrorHandler';

//POST - Authenticate - Retrieves token to registered user
var authentication = function (req: Request, res: Response) {
    logger.debug("POST /auth/authentication");
    userModel.findOne({username: req.body.user}, function (err: any, result: any) {
        if (result && bcrypt.compareSync(req.body.password, result.password)) {
            /* JWT */
            const payload = {
                id: result.id,
                username: req.body.user,
                role: result.role
            }
            const token = jwt.sign(payload, config.jwt.secret);
            /* Session */
            req.session.username = req.body.user;
            req.session.role = result.role;

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
    }).select({ 'password': 1, 'role':1 });
};

var logout = function (req: Request, res: Response) {
    logger.debug("POST /auth/logout");
    req.session.destroy((err: any) => {
        if (err) return httpErrorHandler(err, res);
        res.status(200).json({
            success: true,
            message: 'User logged out succesfuly'
        })
    });
}

module.exports = {
    authentication: authentication,
    logout: logout
}