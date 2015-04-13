var nodemailer = require('nodemailer'),
    path = require('path'),
    templatesDir = path.join(__dirname, './templates'),
    emailTemplates = require('email-templates'),
    config = require('../../../config/config'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash'),
    async = require('async');

if (!global.logger)
    global.logger = console;

var _areTemplatesLoaded = false;
var mailTemplate = null;

/**
    Nodemailer's transport
*/
if(config.mailersConfigure.type == 'SES'){
    var _transport = nodemailer.createTransport("SES", {
        AWSAccessKeyID: config.mailersConfigure.accessKeyId,
        AWSSecretKey: config.mailersConfigure.secretAccessKey,
        ServiceUrl: config.mailersConfigure.serviceUrl
    });
}else if(config.mailersConfigure.type == 'SMTP'){
    var _transport = nodemailer.createTransport("SMTP",{
        service: config.mailersConfigure.service,
        auth: {
            user: config.mailersConfigure.email,
            pass: config.mailersConfigure.password
        }
    });
}else{
    var _transport = {};
}

// Loading templates
var loadTemplates = function(cb) {
    return emailTemplates(templatesDir, function(err, template) {
        if (err)
            return logger.error("Could not load templates because: ", err);
        mailTemplate = template;
        _areTemplatesLoaded = true;
        if (cb) {
            return cb();
        }
    });
};
exports.loadTemplates = loadTemplates;
loadTemplates();

var Render = function(from, locals) {
    this.locals = locals;
    this.send = function(err, html, text) {
        if (err) {
            console.log(err);
        } else {
            _transport.sendMail({
                from: from,
                to: locals.to,
                subject: locals.subject,
                html: html,
                text: text
            }, function(err, responseStatus) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(responseStatus.message);
                }
            });
        }
    };
    this.batch = function(batch) {
        batch(this.locals, templatesDir, this.send);
    };
};


/**
    Mailers

    E.g :
        var Mailer = require(...);

        // Sending registration mail
        Mailer.onRegistration([{            
            to: mailer@mail.com,        // Required 
            subject: "Subject",
            ....    // Object values to be used inside template
        }], function(err, res){
            
        });
 */

var mailers = [{
    functionName: 'onRegistration',
    fromEmailType: 'support',
    subject: 'onRegistration'
}, {
    functionName: 'onResetPassword',
    fromEmailType: 'support',
    subject: 'Reset password link'
}, {
    functionName: 'onFeedback',
    fromEmailType: 'support',
    subject: 'User Feedback',
    toAdmni : true,
    overwrite : {
        to : config.adminDetail.receivingEmail
    }
}];

// Attaching mailers to exports for syntactic sugar
for (var i = 0; i < mailers.length; i++) {
    mailers[i].from = config.mailers[mailers[i].fromEmailType];
    // if(mailers[i].toAdmni){
        exports[mailers[i].functionName] = (function(mailer) {
            return function(contexts, callback) {
                mailTemplate(mailer.functionName, true, function(err, batch) {
                    if (err) {
                        logger.error("Couldn't send email because: ", err);
                        return callback(err);
                    }
                    if(_.isArray(contexts)){
                        async.each(contexts, function(context, cb) {
                            sendMail(context, cb);
                        }, callback);
                    }else if(!_.isArray(contexts) && _.isObject(contexts)){
                        sendMail(contexts, callback);
                    }
                    
                    function sendMail(context, cb){
                        // var context = contexts;
                        // context.to =  config.adminDetail.receivingEmail;
                        _.extend(context, mailer.overwrite || {});
                        batch(context, templatesDir, function(err, html, text) {
                            if (err) return cb(err);
                            return _transport.sendMail({
                                from: mailer.from,
                                to: context.to,
                                subject: mailer.subject,
                                html: html,
                                text: text
                            }, cb);
                        });
                    }
                });
            };
        })(mailers[i]);
    // }else{
    //     exports[mailers[i].functionName] = (function(mailer) {
    //         return function(contexts, callback) {

    //                 var query = {
    //                     email: {
    //                         $in: _.map(contexts, function(e) {
    //                             return e.to;
    //                         })
    //                     }
    //                 };
    //                 User
    //                     .find(query)
    //                     .select('email')
    //                     .lean()
    //                     .exec(function(err, users) {
    //                         contexts = _.filter(contexts, function(context) {
    //                             return !!_.find(users, function(e) {
    //                                 return e.email == context.to
    //                             });
    //                         });
    //                         mailTemplate(mailer.functionName, true, function(err, batch) {
    //                             if (err) {
    //                                 logger.error("Couldn't send email because: ", err);
    //                                 return callback(err);
    //                             }
    //                             async.each(contexts, function(context, cb) {
    //                                 batch(context, templatesDir, function(err, html, text) {
    //                                     if (err) return cb(err);
    //                                     return _transport.sendMail({
    //                                         from: mailer.from,
    //                                         to: context.to || config.adminDetail.receivingEmail,
    //                                         subject: mailer.subject,
    //                                         html: html,
    //                                         text: text
    //                                     }, cb);
    //                                 });
    //                             }, callback);
    //                         });

    //                     });
    //         };
    //     })(mailers[i]);
    // }
        
}