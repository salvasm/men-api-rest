import jwt from 'jsonwebtoken';
import config from "@config/global";
import { NextFunction, Request, Response } from 'express';
import httpErrorHandler from '@services/handlers/globalErrorHandler';
import HttpException from '@api/exceptions/HttpException';

function skipRoute(currentUrl: string) {
    if (config.jwt.allowed.includes(currentUrl)) {
        return true;
    } else {
        return config.jwt.allowed.some(allowedUrl => currentUrl.startsWith(allowedUrl));
    }
}

function authJWT(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, config.jwt.secret, function(err:any, decoded:any) {
            if (err) return httpErrorHandler(err, response);

            request.decoded = decoded;
            return next();
        });
    } else if (skipRoute(request.url)) {
        return next();
    } else {
        throw new HttpException(403,'Forbidden');
    }
}

export default authJWT;