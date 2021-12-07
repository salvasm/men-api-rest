import express from 'express';
import config from '@config/global';
import logger from '@config/logger';
import jwt from '@middlewares/jwt';
import methodOverride from 'method-override';
import { connect } from '@services/database';
import errorMiddleware from './middleware/error';
import session from 'express-session';

class App {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers();
        this.initializeDatabase();
    }

    private initializeMiddlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(methodOverride());
        this.app.use(errorMiddleware);
        this.app.use(jwt);
        this.app.use(session(config.session));
    }

    private initializeControllers() {
        const apiRoutes = require('./routes');
        this.app.use('/api', apiRoutes);
    }

    private initializeDatabase() {
        connect(config.db);
    }

    public listen() {
        logger.info('INITIAL CONNECTIONS');
        try {
            this.app.listen(this.port, () => {
                logger.info('Server:\tDONE \t Port: ' + this.port);
            });
        } catch (error) {
            logger.error('Server:\tFAIL\t Something went wrong');
        }
    }
}

export default App;
