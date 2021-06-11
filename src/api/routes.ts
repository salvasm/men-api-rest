const router = require('express').Router();

// Root API path
router.get('/', (req: any, res: any) => {
    res.send('Welcome to Node.js API REST');
});

// All component routes
var userRoutes = require('./components/user/user.routes');
router.use('/user', userRoutes);

// Handle undefined Routes
router.use('*', (req: any, res: any) => {
    res.status(404);
    res.send('Page not found');
});

module.exports = router;
