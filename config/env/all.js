/**
 * Common config for all environments
 * Overwrite for specific env in that env's file
 */

'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    app: {
        title: 'web-app',
        description: 'web-app',
        keywords: 'web-app'
    },
    db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI,
    root: rootPath,
    port: process.env.PORT || 3000,
    templateEngine: 'jade',
    sessionSecret: 'My-secret-key',
    sessionCollection: 'new-sessions',
    s3: {
        "accessKeyId": "*******************",
        "secretAccessKey": "******************************************",
        "region": "eu-central-1",
        "bucketName": "***********",
        "awsAccountId": '*************'
    },
    ses: {
        "accessKeyId": "********************",
        "secretAccessKey": "****************************************",
        "serviceUrl": "https://email.eu-west-1.amazonaws.com",
        "region": "eu-west-1"
    },
    smtp: {
        service : 'Gmail', // 'email-smtp.us-west-2.amazonaws.com',
        email : '*******@******.com',
        password : '************',
    },
    mailersConfigure : {
        type : 'SES', // 'SMTP'
    },
    mailers: {
        support: "Uberstarter Support ✔ <support@email.com>",
        community: "Uberstarter Community ✔ <community@email.com>",
        blog: "Uberstarter Blog ✔ <blog@email.com>",
        messaging: "Uberstarter Messaging ✔ <messaging@email.com>",
        activity: "Uberstarter Acitivity ✔ <activity@email.com>"
    }
};