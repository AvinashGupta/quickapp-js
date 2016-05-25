'use strict';

var appCtl = require('../controllers/app'),
    _ = require('lodash'),
    path = require('path');

exports.appRoutes = function(app) {
  /**
   * Default App
  */
  app.get('/', appCtl.home);
};

exports.endRoutes = function(app) {
  /**
   * Default App
  */
  app.get('*', appCtl.home);
};