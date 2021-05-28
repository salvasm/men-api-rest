var express = require('express'),
    logger = require('./src/config/logger'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    app = express();

var port = process.env.PORT || 3000;

// Connection to DB
mongoose.connect('mongodb://localhost/user',
    { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
        if (err) throw logger.error('ERROR: connecting to Database. ' + err);
        console.log('Connected to Database');
    });

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride());

var router = express.Router();

// Main route
router.get('/', () => { res.send('Welcome to Node.js API REST!'); });
app.use(router);

// Import all routes
var userRoutes = require('./src/api/components/user/routes.js');
app.use('/api', userRoutes);

// Start server
app.listen(port, function () {
    logger.info('Server running on http://localhost:3000');
});
