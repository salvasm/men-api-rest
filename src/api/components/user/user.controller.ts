import { Request, Response } from 'express';
import UserDto from './user.dto';
import CRUD from '@services/crud';

// Create CRUD
const userCrud = new CRUD('User');

//GET - Return all users
var findAll = function (req: Request, res: Response) {
    userCrud.findAll(req, res);
};

//POST - Insert a new User
var create = function (req: Request, res: Response) {
    var user = new UserDto(req.body);
    userCrud.create(req, res, userCrud.model(user));
};

//GET - Return a User with specified ID
var read = function (req: Request, res: Response) {
    userCrud.findById(req, res);
};

//PUT - Update a register already exists
var update = function (req: Request, res: Response) {
    var user = new UserDto(req.body);
    userCrud.update(req, res, user);
};

//DELETE - Delete a User with specified ID
var deleteOne = function (req: Request, res: Response) {
    userCrud.delete(req, res);
};

module.exports = {
    findAll: findAll,
    create: create,
    read: read,
    update: update,
    delete: deleteOne
}