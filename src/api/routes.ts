import fs from 'fs';
import config from '@config/global';
import express from 'express';
const router = express.Router();

// Root API path
router.get('/', (req: any, res: any) => {
    res.send('Welcome to Node.js API REST');
});

// All component routes dynamically
const components = fs.readdirSync(config.components.path)
for (const component of components) {
    router.use('/' + component, require('@components/' + component + '/' + component + '.routes'));
}

// Handle undefined Routes
router.use('*', (req: any, res: any) => {
    res.status(404);
    res.send({
        success: false,
        status: '404',
        message: 'Page was not found'
    });
});

module.exports = router;
