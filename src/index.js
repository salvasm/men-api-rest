const { app, logger } = require('./api/server');
const config = require('./config/global');
const port = config.port || 3000;

// Start server
app.listen(port, function () {
    logger.info('Server running on http://localhost:' + port);
});
