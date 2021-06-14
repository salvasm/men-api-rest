import { Response } from 'express';

interface error extends Error {
    status: number
}

function httpErrorHandler(error: error, res: Response) {
    var status = error.status || 500;
    var message = error.message || 'Something went wrong';
    res.status(status);
    res.json({
        success: false,
        message: message
    });
}

export default httpErrorHandler;