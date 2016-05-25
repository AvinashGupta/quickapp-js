//Then define the init function for starting up the application
angular && angular.element(document).ready(function() {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';

  //Start by defining the main module and adding the module dependencies
  angular
    .module('WebApp', 
      ['ngResource', 'ngCookies', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ngSanitize', 'angular-growl']
        .concat(ApplicationConfiguration.allModules)
    )
    
    // Setting HTML5 Location Mode
    .config(['$locationProvider',
      function($locationProvider) {
        $locationProvider
          .hashPrefix('!')
          // .html5Mode(true);
      }
    ]);

  //Then init the app
  angular.bootstrap(document, ['WebApp']);
});

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
  // Init module configuration options
  var allModules = [];
  // Add a new vertical module
  var registerModule = function(moduleName, deps) {
    angular.module(moduleName, deps || []);
    allModules.push(moduleName);
  };

  return {
    allModules : allModules,
    registerModule: registerModule
  };
})();