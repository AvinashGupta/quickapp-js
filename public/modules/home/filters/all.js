
angular.module('uberstarter.home')
.filter('getFirstName', [
	function(){
		return function(name){
			return !!name ? name.split(' ')[0] : '';
		}
	}
])