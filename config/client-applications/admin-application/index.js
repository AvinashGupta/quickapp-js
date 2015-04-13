// Note: RESOURCE ACCESS URL IS RELATIVE TO PUBLIC DIRECTORY

module.exports = {
  accessUrl : '/admin',
  indexFileUrl : '/views/admin.jade',
  metaData : {
    title : 'My-project',
    description : 'My-project-description',
    keywords : 'tag1, tag2, tag3',
    siteName : 'site_name',
    appID : 'AppID',
    url : 'Url',
    favicon : '/img/favicon.ico',
    image : '/img/image.png',
    type : 'website'
  },
  angular : {
    globalModlueName : 'My-AdminProject',
    globalDependencies : ['ngResource', 'ngCookies', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ngSanitize'],
    modules : ['admin'],
  },
  css : {
    vendor : [
      '/lib/css/pure-0.5.css',
      '/lib/css/pure-responsive-0.5.css',  

      '/lib/bower/bootstrap/dist/css/bootstrap.min.css',
      '/lib/bower/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    custom : [
      '/style-sheets/common.css',
      '/style-sheets/fonts.css'
    ]
  },

  js : {
    vendor : [
      '/lib/bower/lodash/dist/lodash.min.js',
      '/lib/bower/jquery/dist/jquery.min.js',
      '/lib/bower/angular/angular.min.js',
      '/lib/bower/angular-resource/angular-resource.min.js',
      '/lib/bower/angular-cookies/angular-cookies.min.js',
      '/lib/bower/angular-animate/angular-animate.min.js',
      '/lib/bower/angular-sanitize/angular-sanitize.min.js',
      '/lib/bower/angular-bootstrap/ui-bootstrap-tpls.min.js',
      '/lib/bower/angular-ui-utils/ui-utils.min.js',
      '/lib/bower/angular-ui-router/release/angular-ui-router.min.js',  
    ],
    custom : [
      // '/js/config-main-application.js'
    ],
    test : [
      '/lib/bower/angular-mocks/angular-mocks.js',
      // '/modules/*/tests/*.js'
    ]
  }
};