const express = require('express');
const app = express();
const logger = require('../config/logger');
const methodOverride = require('method-override');
// const jwt = require('./api/middleware/auth');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride());
//app.use(jwt());

// Connect to DB
require('../services/mongoose');

// Import all API routes
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

module.exports = {
    app: app,
    logger: logger
};