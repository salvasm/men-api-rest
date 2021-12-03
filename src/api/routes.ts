const router = require('express').Router();

// Root API path
router.get('/', (req: any, res: any) => {
    res.send('Welcome to Node.js API REST');
});

// All component routes
var authRoutes = require('./components/auth/auth.routes');
router.use('/auth', authRoutes);
var userRoutes = require('./components/user/user.routes');
router.use('/user', userRoutes);

// Handle undefined Routes
router.use('*', (req: any, res: any) => {
    res.status(404);
    res.send({
        error: '404',
        message: 'Page was not found'
    });
});

module.exports = router;
