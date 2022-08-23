import { Router } from 'express';
let router = Router();
// Import Controller
import AuthController from '@components/auth/auth.controller';
const AuthCtrl = new AuthController();

/**
 * CRUD Routes:
 * POST     /api/auth/login
 */
router.route('/login').post(AuthCtrl.authentication);
router.route('/logout').post(AuthCtrl.unauthentication);

module.exports = router;
