import mongoose from 'mongoose';
import logger from '../config/logger';

interface dbData {
    type: string;
    port?: Number;
    host: string;
    name: string;
    user?: string;
    pass?: string;
}

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

// Connection to DB
export function connect(dbData: dbData) {
    var dbUser = dbData.user && dbData.pass ? dbData.user + ':' + dbData.pass + '@' : '';
    var dbPort = dbData.port ? dbData.port : undefined;
    var dbHost = dbPort ? dbData.host + ':' + dbPort : dbData.host;
    var uri = dbData.type + '://' + dbUser + dbHost + '/' + dbData.name;
    mongoose.connect(uri, options).then(() => {
        logger.info('Database:\tSUCCESS\t Port: ' + dbPort);
    }).catch(error => {
        logger.error('Database:\tFAIL\n' + error);
    })
};
