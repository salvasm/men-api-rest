import * as express from 'express';
let router = express.Router();
// Import Controllers
var UserCtrl = require('./user.controller');

/**
 * CRUD Routes:
 * GET      /api/user/
 * POST     /api/user/
 * GET      /api/user/{id}
 * PUT      /api/user/{id}
 * PATCH    /api/user/{id}
 * DELETE   /api/user/{id}
 */
router.route('/').get(UserCtrl.findAllUsers);
router.route('/').post(UserCtrl.addUser);

router.route('/:id').get(UserCtrl.findById);
router.route('/:id').put(UserCtrl.updateUserAllParams);
router.route('/:id').patch(UserCtrl.updateUserParam);
router.route('/:id').delete(UserCtrl.deleteUser);

module.exports = router;
