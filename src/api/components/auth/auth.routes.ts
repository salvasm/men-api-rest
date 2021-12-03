import * as express from 'express';
let router = express.Router();
// Import Controller
var AuthCtrl = require('./auth.controller');

/**
 * CRUD Routes:
 * POST     /api/auth/login
 */
router.route('/login').post(AuthCtrl.authentication);

module.exports = router;
