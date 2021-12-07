import * as express from 'express';
let router = express.Router();
// Import Controller
var AuthCtrl = require('./auth.controller');

/**
 * CRUD Routes:
 * POST     /api/auth/login
 */
router.route('/login').post(AuthCtrl.authentication);
router.route('/logout').post(AuthCtrl.logout);

module.exports = router;
