'use strict';

(function() {
	describe('MEAN controllers', function() {
		describe('homeCtl', function() {
			//Initialize global variables
			var scope,
				HomeController;

			// Load the main application module
			beforeEach(module('uberstarter'));

			beforeEach(inject(function($controller, $rootScope) {
				scope = $rootScope.$new();

				HomeController = $controller('homeCtl', {
					$scope: scope
				});
			}));

			it('should expose the authentication service', function() {
				expect(scope.testimonials.interval).toEqual(1000);
			});
		});
	});
})();