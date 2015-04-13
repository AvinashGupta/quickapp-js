'use strict';

module.exports = {
    db: 'mongodb://localhost/temp-dev-test',
    port: 3001,
    app: {
        title: 'My-project - Test Mode'
    },
    s3: {
        "accessKeyId": "id",
        "secretAccessKey": "key",
        "region": "ap-southeast-1",
        "bucketName": 'name', // Caution auto-expires
        "awsAccountId": 'id'
    },
    ses: {
        "accessKeyId": "id",
        "secretAccessKey": "key",
        "serviceUrl": 'url'
    },
    esPrefix: 'test', //Elastic search index prefix
    mailersConfigure : {
        // type : 'SES',
        // AWSAccessKeyID: config.ses.accessKeyId,
        // AWSSecretKey: config.ses.secretAccessKey,
        // ServiceUrl: config.ses.serviceUrl,

        type : 'SMTP',
        service : 'Gmail',
        email : 'your@email.com',
        password : 'password',
    },
    adminDetail : {
        receivingEmail : 'your@email.com',
        email : 'admin@test.com',
        password : 'password'
    }
};