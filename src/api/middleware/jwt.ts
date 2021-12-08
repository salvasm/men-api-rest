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
            
            jwt.verify(token, config.jwt.secret, function(err:any, decoded:any) {
                if (err) {
                    return response.sendStatus(401);
                  }

                  request.decoded = decoded;
                  return next();
            });
        } else {
            response.sendStatus(401);
        }
    } else {
        next();
    }
}

export default authJWT;