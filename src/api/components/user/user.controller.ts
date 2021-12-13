import { Request, Response } from 'express';
import logger from '@config/logger';
import CRUD from '@components/crud'
import UserDto from './user.dto';

// Create CRUD
const userCrud = new CRUD('User');

//GET - Return all users
var findAll = function (req: Request, res: Response) {
    logger.info("GET /user/");
    userCrud.findAll(req, res);
};

//POST - Insert a new User
var create = function (req: Request, res: Response) {
    logger.info("POST /user");
    var user = new UserDto(req.body);
    userCrud.create(req, res, userCrud.model(user));
};

//GET - Return a User with specified ID
var read = function (req: Request, res: Response) {
    logger.info("GET /user/" + req.params.id);
    userCrud.findById(req, res);
};

//PUT - Update a register already exists
var update = function (req: Request, res: Response) {
    logger.info("PUT /user");
    var user = new UserDto(req.body);
    userCrud.update(req, res, user);
};

//DELETE - Delete a User with specified ID
var deleteOne = function (req: Request, res: Response) {
    logger.info("DELETE /user");
    userCrud.delete(req, res);
};

module.exports = {
    findAll: findAll,
    create: create,
    read: read,
    update: update,
    delete: deleteOne
}