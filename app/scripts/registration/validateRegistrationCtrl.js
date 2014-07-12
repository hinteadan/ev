(function (angular) {
	'use strict';

	angular.module('eye-view-registration')
    .controller('validateRegistration', ['$scope', '$routeParams', '$location', 'registration', 'jsParams', function ($s, $p, $l, registration, p) {

    	$s.validating = true;

    	registration.validate($p.hash).then(function (user) {
    		$s.validating = false;
    		$s.valid = true;
    		p.set('username', user.username);
    		$l.path('/login');
    	}, function (reason) {
    		$s.validating = false;
    		$s.invalid = true;
    		$s.because = reason;
    	});

    	$s.goHome = function () {
    		$l.path('/login');
    	};

    }]);

}).call(this, this.angular);