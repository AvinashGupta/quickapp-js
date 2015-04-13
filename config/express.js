'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    session = require('express-session'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    multipartParser = require('connect-multiparty'),

    passport = require('passport'),
    mongoStore = require('connect-mongo')({
        session: session
    }),
    flash = require('connect-flash'),
    config = require('./config'),
    consolidate = require('consolidate'),
    stylus = require('stylus'),
    stylusMiddleware = require('./stylus-middleware.js')(stylus),
    nib = require('nib'),
    path = require('path'),
    url = require('url'),
    utilities = require('./utilities');

module.exports = function(db) {
    // Initialize express app
    var app = express();

    // Initialize models
    utilities.walk('./app/models', /(.*)\.(js$|coffee$)/).forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });

    // Setting the environment locals
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;

    // Passing the request url to environment locals
    app.use(function(req, res, next) {
        res.locals.url = req.protocol + ':// ' + req.headers.host + req.url;
        next();
    });

    // Should be placed before express.static
    app.use(compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    // Showing stack errors
    app.set('showStackError', true);

    // // Set jade as the template engine
    // app.engine('html', consolidate[config.templateEngine]);  

    // // Set views path and view engine
    app.set('view engine', 'jade');
    app.set('views', config.root + '/public');

    //  request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Stylus set up
    app.use(stylusMiddleware({
        src: path.join(__dirname, '../public'),
        dest: path.join(__dirname, '../public'),
        compile: function(str, thisPath) {
            return stylus(str)
            .set('filename', thisPath)
            .set('paths', [path.join(__dirname, '../public/style-sheets/stylus-shared')])
            .set('compress', true)
            .use(nib());
        }
    }));

    // Enable jsonp
    app.enable('jsonp callback');

    // cookieParser should be above session
    app.use(cookieParser());

    // request 'files' parser
    app.use(multipartParser());

    // express/mongo session storage
    app.use(session({
        secret: config.sessionSecret,
        store: new mongoStore({
            db: db.connection.db,
            collection: config.sessionCollection
        })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages
    app.use(flash());
    // app.use(logger());
    // simple logger
    app.use(function(req, res, next){
      console.log('%s %s', req.method, req.url);
      next();
    });

    // Load Client Applications Markup Routers
    require('./.configureMarkupRouters').createAppsLaunchRoutes(app);

    // Setting the app router and static folder
    app.use(express.static(config.root + '/public'));

    // Load Database API Routes
    utilities.walk('./app/routes', /(.*)\.(js$|coffee$)/).forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    // HTML5 Mode support
    require('./.configureMarkupRouters').setAppsAsDefaultRoutes(app);

    /**
        Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, 
        set properties, use instanceof etc.
     */
    app.use(function(err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        console.error(err);
        // logger.error(err);

        res.status(err.code || 500);

        // respond with html page
        if (req.accepts('html')) {
            // Error page
            return res.render('views/500.jade', {
                error: err.error
            });
        }

        // respond with json
        if (req.accepts('json')) {
            res.jsonp(err.code, {
                'message': err.error || 'Server Error'
            });
            return;
        }
        // default to plain-text. send()
        res.type('txt').send(err.error || 'Server Error');
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
        res.status(404).render('views/404.jade', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });

    return app;
};