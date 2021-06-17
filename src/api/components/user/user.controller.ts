import { Request, Response } from 'express';
import mongoose from 'mongoose';
import logger from '../../../config/logger';
import config from '../../../config/global';
import bcrypt from 'bcrypt';
import CRUD from '../crud';

// Create CRUD
const userCrud = new CRUD('User');

// Import Model
const User = mongoose.model("User");

//GET - Return all users
var findAll = function (req: Request, res: Response) {
    logger.info("GET /user/");
    userCrud.findAll(req, res);
};

//POST - Insert a new User
var create = function (req: Request, res: Response) {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, config.bcrypt.saltRounds),
        gender: req.body.gender,
        birthday: req.body.birthday,
        createdAt: req.body.createdAt,
        modifiedAt: req.body.modifiedAt,
    });
    
    logger.info("POST /user");
    userCrud.create(req, res, user);
};

//GET - Return a User with specified ID
var read = function (req: Request, res: Response) {
    logger.info("GET /user/" + req.params.id);
    userCrud.findById(req, res);
};

//PUT - Update a register already exists
var update = function (req: Request, res: Response) {
    var update = {
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, config.bcrypt.saltRounds),
        gender: req.body.gender,
        birthday: req.body.birthday
    }
    logger.info("PUT /user");
    userCrud.update(req, res, update);
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