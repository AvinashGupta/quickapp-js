'use strict';

// Setting up route
angular.module('uberstarter.home').

config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		// Redirect to home view when route not found
		$urlRouterProvider.when('', '/home');
		$urlRouterProvider.otherwise('/home');

		// Home state routing
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/templates/modules/home/views/dashboard.html',
			})
			// .state('home', {
			// 	url: '/home',
			// 	abstract : true,
			// 	templateUrl: '/templates/modules/home/views/home-top-navigation',
			// 	controller: "homeCtl"
			// })
			// .state('home.default', {
			// 	url: '',
			// 	templateUrl: '/templates/modules/home/views/home',
			// })

			// .state('home.register', {
			// 	url: '/registration',
			// 	templateUrl: 'templates/modules/home/views/register',
			// 	controller: 'LRCtl'
			// })
			// .state('home.login', {
			// 	url: '/login',
			// 	templateUrl: 'templates/modules/home/views/login',
			// 	controller: 'LRCtl'
			// })
	}
])