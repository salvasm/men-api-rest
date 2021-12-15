import mongoose from 'mongoose';
import logger from '@config/logger';
import { dbData } from 'interfaces/global';

export function getMongoDbUri(dbData: dbData) {
    var dbUser = dbData.user && dbData.pass ? dbData.user + ':' + dbData.pass + '@' : '';
    var dbPort = dbData.port ? dbData.port : undefined;
    var dbHost = dbPort ? dbData.host + ':' + dbPort : dbData.host;

    return dbData.type + '://' + dbUser + dbHost + '/' + dbData.name;
}

// Connection to DB
export function connect(dbData: dbData) {
    var uri = getMongoDbUri(dbData);
    mongoose.connect(uri).then(() => {
        logger.debug('Db: \tDONE\t Port: ' + (dbData.port || 27017));
    }).catch(error => {
        logger.error('Db: \tFAIL\n' + error);
    })
};
