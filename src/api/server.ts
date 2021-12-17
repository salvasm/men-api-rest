/* Base */
import express from 'express';
import acl from 'express-acl';
import session from 'express-session';
import methodOverride from 'method-override';
import helmet from 'helmet';
/* Custom */
import config from '@config/global';
import logger from '@config/logger';
import jwt from '@middlewares/jwt';
import connect from '@services/database';
import errorMiddleware from '@middlewares/error';

class App {
    public app: express.Application;
    public port: number;
    
    constructor(port: number) {
        this.app = express();
        this.port = port;
        
        this.initMiddlewares();
        this.initDatabase();
        this.initControllers();
    }

    private initMiddlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(methodOverride());
        this.app.use(helmet());
        this.app.use(session(config.session));
        this.app.use(jwt);
        this.initACL();
        
    }

    private initControllers() {
        const apiRoutes = require('./routes');
        this.app.use(config.api.baseUrl, apiRoutes);
        this.app.use(errorMiddleware);
    }

    private initDatabase() {
        connect(config.db);
    }

    private initACL() {
        acl.config(config.acl);
        this.app.use(acl.authorize.unless({path: config.jwt.allowed}));
    }

    public listen() {
        logger.info('INITIAL CONNECTIONS');
        try {
            this.app.listen(this.port, () => {
                logger.info('Server:\tDONE \t Port: ' + this.port);
            });
        } catch (error) {
            logger.error('Server:\tFAIL\t Internal Server Error');
        }
    }
}

export default App;
