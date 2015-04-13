'use strict';

//Authentication service for user variables
angular.module('uberstarter.LR')
.service('Auth', ['$rootScope', '$state', '$resource', '$http',

    function($rootScope, $state, $resource, $http) {
        var userRes = $resource('/coninjas/me/:userId', {
                userId : '@_id'
            }),
            currentUser = userRes.get();

        function changeUser(user) {
            _.extend(currentUser, user);
        }
        return {
            authorize: function(accessLevel, role) {
                return !! currentUser._id
            },
            isLoggedIn: function(user) {
                return !! currentUser._id
            },
            register: function(credentials, success, error) {
				      $http.post('/auth/signup', credentials)
              .success(function(data) {
                changeUser(data);
					      if(angular.isFunction(success)){
                  success(data)
                }else{
                  window.location = '/index'
                  // $state.go('coninja.home-nav.community');
                }
	            })
              .error(error);
            },
            login: function(credentials, success, error) {
				      $http.post('/auth/signin', credentials)
              .success(function(data) {
                changeUser(data);
				        if(angular.isFunction(success)){
                  success(data)
                }else{
                  window.location = '/index'
                  // $state.go('coninja.home-nav.community');
                }
	            })
              .error(error);
            },
            logout: function(success, error) {
                /* logout from server */
                $http.post('/auth/signout')
                .success(function() {
                  changeUser({
                      username: '',
                      type: 'type'
                  });
                  if(angular.isFunction(success)){
                    success()
                  }else{
                    window.location = '/'
                  }
                })
                .error(error);
            },
            changeUser: function(user) {
                changeUser(user);
            },
            user: currentUser
        }
    }
]);
