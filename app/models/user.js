'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosastic = require('mongoosastic'),
    config = require('../../config/config'),
    ObjectId = Schema.ObjectId,
    crypto = require('crypto');

var S3FileUploader = require('mongoose-s3-file');

/**
 * User Schema
 */
var UserSchema = new Schema({
    /******* UI *******/
    name: {
        type: String,
    },
    // picture: {
    //     type: mongoose.SchemaTypes.S3File,
    //     prefix: '/user-profile-pic/',
    // },
    email: {
        type: String,
        unique: true,
    },
    about: {
        type: String,
        trim: true,
    },
    provider: {
        type: String,
        required: true
    },
    twitter : {
        id : String,
        displayName : String,
        picture : String
    },
    hashed_password: String,
    salt: String,
    date : Date,
    updateDate : Date
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

// The below 5 validations only apply if you are signing up traditionally
UserSchema.path('email').validate(function(email) {
    if (this.provider !== 'local') return true;
    else return email.length;
}, 'Email cannot be blank');
UserSchema.path('hashed_password').validate(function(hashed_password) {
    if (this.provider !== 'local') return true;
    else return hashed_password.length;
}, 'Password cannot be blank');

/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {

    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password) && this.provider === 'local') next(new Error('Invalid password'));
    else next();
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};


/**
 * Plugin
 */
UserSchema.plugin(require('mongoose-timestamp'));
UserSchema.plugin(mongoosastic, {
    index: config.esPrefix + 'user',
    settings: {
        "analysis": {
            "analyzer": {
                "autocomplete": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": ["standard", "lowercase", "stop", "kstem", "ngram"]
                }
            },
            "filter": {
                "ngram": {
                    "type": "ngram",
                    "min_gram": 2,
                    "max_gram": 15
                }
            }
        }
    }
});

// UserSchema.plugin(S3FileUploader.plugin, {
//     accessKeyId: config.s3.accessKeyId,
//     secretAccessKey: config.s3.secretAccessKey,
//     region: config.s3.region,
//     bucketName: config.s3.bucketName,
//     acl: 'public-read',
//     prefix: ''
// });


var User = mongoose.model('User', UserSchema);
User.createMapping(function(er, mapping) {
});