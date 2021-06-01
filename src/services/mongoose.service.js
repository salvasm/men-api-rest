const mongoose = require('mongoose');
const logger = require('../config/logger');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connection to DB
mongoose.connect('mongodb://localhost/user', options).then(() => {
    logger.info('Connected to Database');
}).catch(err => {
    logger.error('ERROR: connecting to Database. ' + err);
});

exports.mongoose = mongoose;
