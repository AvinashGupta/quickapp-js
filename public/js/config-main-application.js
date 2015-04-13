// 'use strict';

// // Init the application configuration module for AngularJS application
// var ApplicationConfiguration = (function() {
// 	// Init module configuration options
// 	var applicationModuleName = 'uberstarter';
// 	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ngSanitize'];
// 	var allModules = [];
// 	// Add a new vertical module
// 	var registerModule = function(moduleName) {
// 		// Create angular module
// 		angular.module(moduleName, []);

// 		// Add the module to the AngularJS configuration file
// 		// angular.module(applicationModuleName).requires.push(moduleName);
// 		allModules.push(moduleName);
// 	};

// 	return {
// 		applicationModuleName: applicationModuleName,
// 		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
// 		allModules : allModules,
// 		registerModule: registerModule
// 	};
// })();


// // //Start by defining the main module and adding the module dependencies
// // angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);


// //Then define the init function for starting up the application
// angular.element(document).ready(function() {
// 	//Fixing facebook bug with redirect
// 	if (window.location.hash === '#_=_') window.location.hash = '#!';
// 	//Start by defining the main module and adding the module dependencies
// 	angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies.concat(ApplicationConfiguration.allModules));
	
// 	// Setting HTML5 Location Mode
// 	angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
// 		function($locationProvider) {
// 			$locationProvider.
// 			// html5Mode(true);
// 			hashPrefix('!');
// 		}
// 	]);

// 	//Then init the app
// 	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
// });