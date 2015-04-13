'use strict';

// Config HTTP Error Handling
angular.module('uberstarter.LR')
.config(['$httpProvider',
  function($httpProvider) {
	// Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location',
      function($q, $location) {
        return {
          responseError: function(rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                // Auth.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour 
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
])
.run(['$location', '$rootScope', 'Auth',
  function($location, $rootScope, Auth){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      // if (!Auth.authorize(toState.access)) {
      //   if(Auth.isLoggedIn()) $location.path('/');
      //   else                  $location.path('/');
      // }    
    })
  }
])