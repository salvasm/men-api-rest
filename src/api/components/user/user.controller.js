const mongoose = require('../../../services/mongoose.service').mongoose;
const logger = require('../../../config/logger');
const config = require('../../../config/global');
const bcrypt = require('bcrypt');
const User = mongoose.model("User");

//GET - Return all users
exports.findAllUsers = function (req, res) {
    User.find(function (err, user) {
        if (err) {
            res.status(500).send(err.message);
        }
        logger.info("GET /user");
        res.status(200).jsonp(user);
    });
};

//GET - Return a User with specified ID
exports.findById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).jsonp({
                message: err.message,
                reason: err.reason.message
            });
        }
        if (user) {
            logger.info("GET /user/" + req.params.id);
            res.status(200).jsonp(user);
        } else {
            res.status(200).send('User not found');
        }
    });
};

//POST - Insert a new User
exports.addUser = function (req, res) {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, config.saltRounds),
        gender: req.body.gender,
        birthday: req.body.birthday,
        createdAt: req.body.createdAt,
        modifiedAt: req.body.modifiedAt,
    });

    user.save(function (err, user) {
        if (err) return res.status(500).send(err.message);
        logger.info("POST /user");
        res.status(201).jsonp(user);
    });
};

//PUT - Update a register already exists
exports.updateUser = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        user.username = req.body.username ? req.body.username : user.username;
        user.email = req.body.email ? req.body.email : user.email;
        user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
        user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
        user.password = req.body.password ? bcrypt.hashSync(req.body.password, config.saltRounds) : user.password;
        user.gender = req.body.gender ? req.body.gender : user.gender;
        user.birthday = req.body.birthday ? req.body.birthday : user.birthday;
        user.createdAt = req.body.createdAt ? req.body.createdAt : user.createdAt;
        user.modifiedAt = req.body.modifiedAt ? req.body.modifiedAt : user.modifiedAt;

        user.save(function (err) {
            if (err) return res.send(500, err.message);
            logger.info("PUT /user");
            res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (user) {
            user.remove(function (err) {
                if (err) {
                    return res.send(500, err.message);
                }
                logger.info("DELETE /user");
                res.status(200).send('User ' + user.id + ' was deleted');
            });
        } else {
            res.status(200).send('User not found');
        }
    });
};
