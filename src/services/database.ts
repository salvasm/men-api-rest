import mongoose from 'mongoose';
import logger from '../config/logger';

interface dbData {
    port?: Number;
    host: string;
    name: string;
}

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

// Connection to DB
export function connect(dbData: dbData) {
    var port = dbData.port ? ':' + dbData.port : 27017;
    var uri = 'mongodb://' + dbData.host + ':' + port + '/' + dbData.name;
    mongoose.connect(uri, options).then(() => {
        logger.info('Database:\tSUCCESS\t Port: ' + port);
    }).catch(error => {
        logger.error('Database:\tFAIL\n' + error);
    })
};
