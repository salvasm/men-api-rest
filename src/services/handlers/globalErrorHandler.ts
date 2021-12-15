import { Response } from 'express';
import { error } from '@interfaces/global'
import mongoErrors from '@handlers/mongoErrorHandler'

function httpErrorHandler(error: error, res: Response) {
    var status = error.status || 500;
    var message = error.message || 'Something went wrong';
    
    // Manage Mongo errors
    if(error.name === 'ValidationError') return mongoErrors.handleValidationError(error, res);
    if(error.code && error.code === 11000) return mongoErrors.duplicatedKeyError(error, res);

    res.status(status);
    res.json({
        success: false,
        status: status,
        message: message
    });
}

export default httpErrorHandler;