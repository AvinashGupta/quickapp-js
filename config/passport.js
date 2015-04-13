'use strict';

var passport = require('passport'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    utilities = require('./utilities'),
    config = require('./config');

module.exports = function() {
    // Serialize sessions
    passport.serializeUser(function(user, done) {
        // return id of session user
        done(null, user);
    });

    // Deserialize sessions
    passport.deserializeUser(function(a, user, done) {
        console.log(a.url)

        switch(user.userType){
            case 'admin': {
                if(a.url.match('^(\/admin)')){
                    done(null, config.adminDetail);
                }
                break;
            }
            default: {
                // Find id in user database and return user object
                User.findOne({
                    _id: user._id
                }, '-salt -hashed_password', function(err, user) {
                    done(err, user);
                });
            }
        }
    });

    // Initialize strategies
    utilities.walk('./config/strategies', /(.*)\.(js$|coffee$)/).forEach(function(strategyPath) {
        require(path.resolve(strategyPath))();
    });
};