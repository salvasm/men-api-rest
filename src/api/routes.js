const router = require('express').Router();

// Root API path
router.get('/', (req, res) => {
    res.send('Welcome to Node.js API REST');
});

// All component routes
var userRoutes = require('./components/user/user.routes');
router.use('/', userRoutes);

// Handle undefined Routes
router.use('*', (req, res) => {
    res.status(404);
    res.send('Page not found');
});

module.exports = router;