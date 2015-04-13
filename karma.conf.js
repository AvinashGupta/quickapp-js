'use strict';

// console.log(process.argv);
// try{
//   console.log(require('./asdasdas'));  
// }catch(err){
//   console.log(err);
//   process.exit();
// }

/**
 * Module dependencies.
 */
var mainApplication = require('./config/client-applications/main-application'),
    moduleFiles = require('./app/helpers/moduleFiles').get(mainApplication);


var files = mainApplication.js.vendor.concat(mainApplication.js.custom, moduleFiles.js, mainApplication.js.test);
for(var i=0; i<files.length; i++){
  files[i] = files[i][0]=='/' ? (files[i] = 'public'+files[i]) : (files[i] = 'public/'+files[i]);
}
// Karma configuration
module.exports = function(config) {
  config.set({
    // Frameworks to use
    frameworks: ['jasmine'],

    // List of files / patterns to load in the browser
    files: files,

    // Test results reporter to use
    // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    //reporters: ['progress'],
    reporters: ['progress'],

    // Web server port
    port: 9876,

    // Enable / disable colors in the output (reporters and logs)
    colors: true,

    // Level of logging
    // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // If true, it capture browsers, run tests and exit
    singleRun: true
  });
};