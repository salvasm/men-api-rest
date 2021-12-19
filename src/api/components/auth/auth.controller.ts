import { Request, Response } from 'express';
import HttpException from '@api/exceptions/HttpException';
import * as AuthService from '@services/auth.service';

class UserController {
    authentication = async (req: Request, res: Response) => {       
        try {
            const result = await AuthService.authentication(req.body.user, req.body.password)
            return res.status(result.status).json(result);
        } catch (error: unknown) {
            throw new HttpException(500, 'Internal Server Error');
        }
    };
}

export default UserController;
