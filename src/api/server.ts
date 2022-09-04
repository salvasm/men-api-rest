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
/* Swagger Doc */
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

class App {
    public app: express.Application;
    public port: number;
    public version: number;
    
    constructor(port: number, version: number = 1) {
        this.app = express();
        this.port = port;
        this.version = version;
        
        this.initSwagger();
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
        const versionUrl = '/v' + this.version;
        const apiRoutes = require('.' + versionUrl + '/routes');
        const routesUrl = config.api.baseUrl + versionUrl + '/';
        this.app.use(routesUrl, apiRoutes);
        this.app.use(errorMiddleware);
    }

    private initDatabase() {
        connect(config.db);
    }

    private initACL() {
        acl.config(config.acl);
        this.app.use(acl.authorize.unless({path: config.jwt.allowed}));
    }

    private initSwagger() {
        this.app.use(config.swagger.route, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    }

    public listen() {
        try {
            this.app.listen(this.port, () => {
                logger.info('API:\tDONE\t Port: ' + this.port + '\tVersion: ' + this.version);
            });
        } catch (error) {
            logger.error('API:\tFAIL\t Internal Server Error');
        }
    }
}

export default App;
