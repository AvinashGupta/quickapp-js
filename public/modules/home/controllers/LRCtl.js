angular.module('uberstarter.home')
.controller('LRCtl', ['$scope', '$state', 'Auth',
	function($scope, $state, Auth){

		$scope.credentials = {};
    $scope.signup = function() {
      console.log($scope.credentials);
      Auth.register($scope.credentials);
    };

    $scope.signin = function() {
      Auth.login($scope.credentials);
    };	
	}
])