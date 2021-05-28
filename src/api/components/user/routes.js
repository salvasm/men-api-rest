var express = require('express'),
    mongoose = require('mongoose');

// Import Models
var User = require('./model.js');
var userModel = mongoose.model('User');

// Import Controllers
var UserCtrl = require('./controller.js');

var router = express.Router();

router.route('/user').get(UserCtrl.findAllUsers);
router.route('/user').post(UserCtrl.addUser);

router.route('/user/:id').get(UserCtrl.findById);
router.route('/user/:id').put(UserCtrl.updateUser);
router.route('/user/:id').delete(UserCtrl.deleteUser);

module.exports = router;