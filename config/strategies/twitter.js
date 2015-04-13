'use strict';

var passport = require('passport'),
    mongoose = require('mongoose'),
    TwitterStrategy = require('passport-twitter').Strategy,
    User = mongoose.model('User');

module.exports = function() {
    passport.use(new TwitterStrategy({
        consumerKey: 'X49cj859RKNqmcPvwkRCj7Cgi',
        consumerSecret: 'jdFkb2f7KDzpG1zVjkz4tuQKPmeUqa8nUv5gBE10CzMYQ8i9Hp',
        callbackURL: "/auth/twitter/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOne({
            'provider' : 'twitter',
            'twitter.id' : profile.id
        }, function(err, data){
            if(err) return done(err, null);
            if(!data){
                var newUser = new User({
                    provider : 'twitter',
                    date : new Date(),
                    updateDate : new Date(),
                    twitter : {
                        id : profile.id,
                        displayName : profile.displayName,
                        picture : profile.photos[0].value
                    }
                })
                newUser.save(function(err, data){
                    if(err) return done(err, null);
                })
            }else{
                done(null, data);
            }
        })
      }
    ));
}