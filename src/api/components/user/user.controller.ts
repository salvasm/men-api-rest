import { NextFunction, Request, Response } from 'express';
import UserDto from './user.dto';
import CRUD from '@services/crud.service';
import { getPagination } from '@components/helpers'
const crud = new CRUD('User');
class UserController {
    constructor() {}

    async findAll (req: Request, res: Response, next: NextFunction){
        try {
            const { limit, skipIndex } = getPagination(req.query);
            var result = await crud.findAll(limit, skipIndex);
            return res.status(result.status).json(result);
        } catch (error: unknown) {
            next(error);
        }
    };

    async create (req: Request, res: Response, next: NextFunction){
        try {
            var user = new UserDto(req.body);
            const result = await crud.create(crud.model(user));
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    };

    async read(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await crud.findById(req.params.id);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    };

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            var user = new UserDto(req.body);
            const result = await crud.update(req.params.id, user);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    };

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await crud.delete(req.params.id);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;
