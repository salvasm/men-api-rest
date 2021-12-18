import * as express from 'express';
let router = express.Router();
// Import Controller
import AuthController from '@components/auth/auth.controller';
const AuthCtrl = new AuthController();

/**
 * CRUD Routes:
 * POST     /api/auth/login
 */
router.route('/login').post(AuthCtrl.authentication);

module.exports = router;
