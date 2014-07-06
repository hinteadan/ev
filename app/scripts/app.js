(function (angular) {
    'use strict';

	angular.module('eye-view', ['ngRoute', 'eye-view-common', 'eye-view-users'])
	.config(['$routeProvider', function ($rp) {
		$rp.when('/createUser', { templateUrl: 'scripts/users/createUser.tmpl.html', controller: 'createUser' });
		$rp.when('/login', { templateUrl: 'scripts/users/login.tmpl.html', controller: 'login' });
	}]);

}).call(this, this.angular);
