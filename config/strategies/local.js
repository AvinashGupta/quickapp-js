'use strict';

var passport = require('passport'),
    mongoose = require('mongoose'),
    config = require('../config'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User'),
    _ = require('lodash');


module.exports = function() {
    // Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passOptionsToCallback: true
        },
        function(options, email, password, done) {
            switch(options.userType){
                case 'admin': {
                    if(email == config.adminDetail.email && password == config.adminDetail.password){
                        var adminUser = _.clone(config.adminDetail, true);
                        adminUser.userType = 'admin';
                        done(null, adminUser);
                    }else{
                        var error = new Error("Invalid credentials");
                        error.code = 403;
                        done(error);
                    }
                    break;
                }
                default: {
                    // Find user in user database with input credentials and return user object
                    User.findOne({
                        email: email
                    }, function(err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (!user) {
                            return done(null, false, {
                                message: 'Unknown user'
                            });
                        }
                        if (!user.authenticate(password)) {
                            return done(null, false, {
                                message: 'Invalid password'
                            });
                        }
                        return done(null, user);
                    });
                }
            }
        }
    ));
};