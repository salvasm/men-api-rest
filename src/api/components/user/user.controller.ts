import { Request, Response } from 'express';
import UserDto from './user.dto';
import CRUD from '@services/crud.service';
import HttpException from '@api/exceptions/HttpException';

class UserController {
    private crudService;

    constructor() {
        this.crudService = new CRUD('User');
    }

    findAll = async (res: Response) => {
        try {
            const result = await this.crudService.findAll();
            return res.status(result.status).json(result);
        } catch (error: unknown) {
            throw new HttpException(500, 'Internal Server Error');
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            var user = new UserDto(req.body);
            const result = await this.crudService.create(this.crudService.model(user));
            console.log(result);
            return res.status(result.status).json(result);
        } catch (error) {
            throw new HttpException(500, 'Internal Server Error');
        }
    };

    read = async (req: Request, res: Response) => {
        try {
            const result = await this.crudService.findById(req.params.id);
            return res.status(result.status).json(result);
        } catch (error) {
            throw new HttpException(500, 'Internal Server Error');
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            var user = new UserDto(req.body);
            const result = await this.crudService.update(req.params.id, user);
            return res.status(result.status).json(result);
        } catch (error) {
            throw new HttpException(500, 'Internal Server Error');
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const result = await this.crudService.delete(req.params.id);
            return res.status(result.status).json(result);
        } catch (error) {
            throw new HttpException(500, 'Internal Server Error');
        }
    };
}

export default UserController;
