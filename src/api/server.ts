import express from 'express';
import config from '../config/global';
import logger from '../config/logger';
import methodOverride from 'method-override';
import { connect } from '../services/database';

class App {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers();
        this.connectDatabase();
    }

    private initializeMiddlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(methodOverride());
        //this.app.use(jwt());
    }

    private initializeControllers() {
        const apiRoutes = require('./routes');
        this.app.use('/api', apiRoutes);
    }

    private connectDatabase() {
        connect(config.db);
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info('Server running:\tSUCCESS\t Port: ' + this.port);
        });
      }
}

export default App;
