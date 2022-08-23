import fs from 'fs';
import config from '@config/global';
import { Router } from 'express';
import HttpException from './exceptions/HttpException';
const router = Router();

// Root API path
router.get('/', (req: any, res: any) => {
    res.status(200).send({
        message: 'Welcome to MEN API REST'
    });
});

// All component routes dynamically
const components = fs.readdirSync(config.components.path, { withFileTypes: true })
for (const component of components) {
    if (component.isDirectory()) {
        router.use('/' + component.name, require('@components/' + component.name + '/' + component.name + '.routes'));
    }
}

// Handle undefined Routes
router.use('*', (req: any, res: any) => {
    throw new HttpException(404, 'Route was not found');
});

module.exports = router;
