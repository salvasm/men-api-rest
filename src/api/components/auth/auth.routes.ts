import * as express from 'express';
let router = express.Router();
// Import Controller
var AuthCtrl = require('./auth.controller');

/**
 * CRUD Routes:
 * POST     /api/auth/signin
 * POST     /api/auth/login
 */
router.route('/signin').post(AuthCtrl.signin);
router.route('/login').post(AuthCtrl.login);

module.exports = router;
