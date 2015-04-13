angular.module('uberstarter.home')
.controller('homeCtl', ['$scope',
	function($scope){
		$scope.testimonials = [{
			quote : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
			person : {
				pic : '',
				name : 'Robin Van Persie',
				type : 'Royal fucking cunt'
			},
			// active : true
			},{
			quote : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
			person : {
				pic : '',
				name : 'Robin Van ',
				type : 'Royal cunt'
			},
			// active : false
			},{
			quote : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
			person : {
				pic : '',
				name : 'Van Persie',
				type : 'Royal fucking cunt'
			},
			// active : false
		}]
		$scope.testimonials.interval = 1000;
	}
])