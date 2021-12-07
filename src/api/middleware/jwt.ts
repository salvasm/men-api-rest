import jwt from 'jsonwebtoken';
import config from "@config/global";
import { NextFunction, Request, Response } from 'express';

function skipRoute(currentUrl: string) {
    return config.jwt.allowed.includes(currentUrl);
}

function authJWT(request: Request, response: Response, next: NextFunction) {
    if (!skipRoute(request.originalUrl)) {
        const authHeader = request.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            
            if (jwt.verify(token, config.jwt.secret)) {
                next();
            } else {
                response.sendStatus(401);
            }
        } else {
            response.sendStatus(401);
        }
    } else {
        next();
    }
}

export default authJWT;