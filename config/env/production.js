'use strict';

module.exports = {
    db: 'mongodb://localhost/temp-dev',
    s3: {
        "accessKeyId": "id",
        "secretAccessKey": "key",
        "region": "ap-southeast-1",
        "bucketName": 'uberstarter-dev',
        "awsAccountId": 'id'
    },
    ses: {
        "accessKeyId": "id",
        "secretAccessKey": "kwy",
        "serviceUrl": 'url'
    },
    esPrefix: '', //Elastic search index prefix
    mailers: {
        support: "TimeVault Support ✔ <your@email.com>",
    },
    mailersConfigure : {
        // type : 'SES',
        // AWSAccessKeyID: config.ses.accessKeyId,
        // AWSSecretKey: config.ses.secretAccessKey,
        // ServiceUrl: config.ses.serviceUrl,

        type : 'SMTP',
        service : 'Gmail', // 'Zoho',
        email : 'your@email.com',
        password : 'password',
    },
    adminDetail: {
        receivingEmail : 'your@email.com',
        email : 'admin@email.com',
        password : 'adminpassword'
    },
};