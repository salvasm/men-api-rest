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
 * DELETE   /api/user/{id}
 */
router.route('/').get(UserCtrl.findAll);
router.route('/').post(UserCtrl.create);

router.route('/:id').get(UserCtrl.read);
router.route('/:id').put(UserCtrl.update);
router.route('/:id').delete(UserCtrl.delete);

module.exports = router;
