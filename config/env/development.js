'use strict';

module.exports = {
    db: 'mongodb://localhost/temp-dev',
    app: {
        title: 'My-project - Dev Mode'
    },
    s3: {
        "accessKeyId": "id",
        "secretAccessKey": "key",
        "region": "ap-southeast-1",
        "bucketName": 'name',
        "awsAccountId": 'id'
    },
    ses: {
        "accessKeyId": "keyid",
        "secretAccessKey": "secret",
        "serviceUrl": 'url'
    },
    esPrefix: 'dev', //Elastic search index prefix
    mailersConfigure : {
        // type : 'SES',
        // AWSAccessKeyID: config.ses.accessKeyId,
        // AWSSecretKey: config.ses.secretAccessKey,
        // ServiceUrl: config.ses.serviceUrl,

        type : 'SMTP',
        service : 'Gmail',
        email : 'your@email.com',
        password : 'yourpassword',
    },
    adminDetail : {
        receivingEmail : 'youradminrecieve@email.com',
        email : 'admin@email.com',
        password : 'yourpassword'
    }
};