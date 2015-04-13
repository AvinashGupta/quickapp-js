/**
 * Common config for all environments
 * Overwrite for specific env in that env's file
 */

'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    app: {
        title: 'My-project',
        description: 'My-project-description',
        keywords: 'My-project-keywords'
    },
    db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI,
    root: rootPath,
    port: process.env.PORT || 3000,
    templateEngine: 'jade',
    sessionSecret: 'My-secret-key',
    sessionCollection: 'new-sessions',
    mailers: {
        support: "Uberstarter Support ✔ <support@email.com>",
        community: "Uberstarter Community ✔ <community@email.com>",
        blog: "Uberstarter Blog ✔ <blog@email.com>",
        messaging: "Uberstarter Messaging ✔ <messaging@email.com>",
        activity: "Uberstarter Acitivity ✔ <activity@email.com>"
    }
};