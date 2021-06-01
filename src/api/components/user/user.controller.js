const mongoose = require('../../../services/mongoose.service').mongoose;
var logger = require("../../../config/logger");
var User = mongoose.model("User");

//GET - Return all users
exports.findAllUsers = function (req, res) {
    User.find(function (err, user) {
        if (err) {
            res.send(500, err.message);
        }
        logger.info("GET /user");
        res.status(200).jsonp(user);
    });
};

//GET - Return a User with specified ID
exports.findById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        logger.info("GET /user/" + req.params.id);
        res.status(200).jsonp(user);
    });
};

//POST - Insert a new User
exports.addUser = function (req, res) {
    console.log("POST");
    console.log(req.body);

    var user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        gender: req.body.gender,
        isPlayer: req.body.isPlayer,
        isPartner: req.body.isPartner,
        birthday: req.body.birthday,
    });

    user.save(function (err, user) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(user);
    });
};

//PUT - Update a register already exists
exports.updateUser = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        user.name = req.body.name;
        user.lastname = req.body.lastname;
        user.gender = req.body.gender;
        user.isPlayer = req.body.isPlayer;
        user.isPartner = req.body.isPartner;
        user.birthday = req.body.birthday;

        user.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        user.remove(function (err) {
            if (err) {
                return res.send(500, err.message);
            }
            res.status(200);
        });
    });
};
