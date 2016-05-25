'use strict';

var passport = require('passport'),
		loginCtl = require('../controllers/login');

module.exports = function(app) {
	/**
	 * Login/Registration : Twitter
	*/
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  	successRedirect: '/',
    failureRedirect: '/templates/views/404'}
  ));

  /**
   * Login/Registration : Local
  */
  app.post('/user/login', loginCtl.loginLocal)
  app.post('/user/register', loginCtl.registerLocal)
  app.post('/user/logout', loginCtl.signout)
  app.post('/test', loginCtl.test)
};