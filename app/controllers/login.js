var mongoose = require('mongoose'),
	passport = require('passport'),
    User = mongoose.model('User'),
    Mailer = require('../helpers/mailer');

/**
 * Signin after passport authentication
 */
exports.loginLocal = function(req, res, next) {
	passport.authenticate('local', {
        // userType : 'admin'
    }, function(err, user, info) {
    if (err || !user) {
        return next({
            error: info,
            code: 400
        });
    } else {
        // console.log('loginLocal called after authenticate');
        req.logIn(user, function(err) {
            if (err) {
                return next({
                    error: err,
                    code: 400
                });
            } else {
                res.jsonp(user);
            }
        });
    }
  })(req, res, next);
}

/**
 * Signup and login
 */
exports.registerLocal = function(req, res, next){
    // Init Variables
    var user = new User(req.body);
    var message = null;
    var name = user.name;

    // Add missing user fields
    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            console.error(err);
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Email or username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }
            console.log(message);
            return next({
                error: message,
                code: 400
            });
        }
        req.logIn(user, function(err) {
          if (err) {
            return next({
                error: err,
                code: 400
            });
          }
          Mailer.onRegistration([{
              to: user.email,
              user: user,
              name: name,
          }], function(err, res) {
              if (err)
                  logger.error("Error with mailer: ", err);
          });
          res.jsonp(user);
        });
    });
};

/**
 * Signout
 */
exports.signout = function(req, res) {
    req.logout();
    // res.redirect('/');
    res.jsonp({});
};

/**
 * Test
 */
exports.test = function(req, res) {
    console.log(req.user);
    res.jsonp({});
};