'use strict';

module.exports = {
    db: 'mongodb://localhost/temp-dev',
    app: {
        title: 'My-project - Dev Mode'
    },
    esPrefix: 'dev', //Elastic search index prefix
    adminDetail : {
        receivingEmail : 'youradminrecieve@email.com',
        email : 'admin@email.com',
        password : 'yourpassword'
    }
};