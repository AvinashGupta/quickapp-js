// Note: RESOURCE ACCESS URL IS RELATIVE TO PUBLIC DIRECTORY

module.exports = {
  accessUrl : '/',
  indexFileUrl : '/views/main.jade',
  metaData : {
  	title : 'web-app',
  	description : 'web-app',
  	keywords : 'web-app,web-app1',
  	siteName : 'site_name',
  	appID : 'AppID',
  	url : 'Url',
  	favicon : '/img/favicon.ico',
  	image : '/img/image.png',
  	type : 'website'
  },
  angular : {
    globalModlueName : 'My-AdminProject',
    globalDependencies : ['ngResource', 'ngCookies', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ngSanitize', 'angular-growl'],
    modules : ['core', 'home'],
  },
  css : {
    vendor : [
      '/lib/bower/bootstrap/dist/css/bootstrap.min.css',
      '/lib/bower/font-awesome/css/font-awesome.min.css',
      '/lib/bower/bootstrap/dist/css/bootstrap-theme.min.css',
      '/lib/bower/angular-growler/build/angular-growl.min.css'
    ],
    custom : [
      '/style-sheets/common.css',
      '/style-sheets/fonts.css'
    ]
  },
  
  js : {
    vendor : [
      '/lib/bower/lodash/lodash.min.js',
      '/lib/bower/jquery/dist/jquery.min.js',
      '/lib/bower/bootstrap/dist/js/bootstrap.min.js',
      '/lib/bower/angular/angular.min.js',
      '/lib/bower/angular-resource/angular-resource.min.js',
      '/lib/bower/angular-cookies/angular-cookies.min.js',
      '/lib/bower/angular-animate/angular-animate.min.js',
      '/lib/bower/angular-sanitize/angular-sanitize.min.js',
      '/lib/bower/angular-bootstrap/ui-bootstrap-tpls.min.js',
      '/lib/bower/angular-ui-utils/ui-utils.min.js',
      '/lib/bower/angular-ui-router/release/angular-ui-router.min.js',  
      '/lib/bower/angular-growler/build/angular-growl.min.js',
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