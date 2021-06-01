const express = require('express');
const app = express();
const logger = require('./config/logger');
const config = require('./config/global');
const methodOverride = require('method-override');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride());

// Connect to DB
const mongoose = require('./services/mongoose.service').mongoose;

const port = config.port || 3000;

// Import all API routes
const apiRoutes = require('./api/routes');
app.use('/api', apiRoutes);

// Start server
app.listen(port, function () {
    logger.info('Server running on http://localhost:' + port);
});
