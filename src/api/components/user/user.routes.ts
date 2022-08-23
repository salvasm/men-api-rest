import { Router } from 'express';
let router = Router();
// Import Controller
import UserController from '@components/user/user.controller';
const UserCtrl = new UserController();

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
