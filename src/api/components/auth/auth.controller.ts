import { NextFunction, Request, Response } from 'express';
import * as AuthService from '@services/auth.service';

class AuthController {
    authentication = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await AuthService.authentication(req.body.user, req.body.password)
            /* Session */
            if (result.result) {
                req.session.username = req.body.user;
                req.session.role = result.result.role;
            }
    
            return res.status(result.status).json(result);
        } catch (error) {
            next(error)
        }
    };

    unauthentication = async (req: Request, res: Response, next: NextFunction) => {       
        try {
            const result = await AuthService.unauthentication(req);
            return res.status(result.status).json(result);
        } catch (error: unknown) {
            next(error);
        }
    };
}

export default AuthController;
