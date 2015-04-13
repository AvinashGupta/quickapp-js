var mongoose = require('mongoose'),
  passport = require('passport'),
    User = mongoose.model('User'),
    Mailer = require('../helpers/mailer');

/**
 * Signin after passport authentication
 */
exports.loginLocal = function(req, res, next) {
  passport.authenticate('local', {
    userType : 'admin'
  }, function(err, user, info) {
    if (err || !user) {
        return next({
            error: info,
            code: 400
        });
    } else {
        req.logIn(user, function(err) {
            if (err) {
                return next({
                    error: err,
                    code: 400
                });
            } else {
                // console.log('>>>>>');
                // console.log(req.user);
                res.jsonp(user);
            }
        });
    }
  })(req, res, next);
}

/**
 * Signout
 */
exports.signout = function(req, res) {
    req.logout();
    // res.redirect('/admin');
    res.jsonp({});
};