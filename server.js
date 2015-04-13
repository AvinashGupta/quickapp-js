/**
 * Get the app going !
 */

'use strict';

var time = new Date();

/**
 * First we set the node enviornment variable if not set before
 * Options: development, production, test
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


/**
 * Module dependencies.
 */
var config = require('./config/config'),
    mongoose = require('mongoose'),
    logger = require('./config/logger');


// Make logger global 
global.logger = logger;

// Init db connection
var db = mongoose.connect(config.db);

// Init the express app
var app = require('./config/express')(db);

// Init passport (login module)
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app object
exports = module.exports = app;

// Log start of server
logger.info("\n0... " + (new Date() - time) / 1000 + ' seconds');
logger.info("\n"+config.app.title+' started on port ' + config.port);
