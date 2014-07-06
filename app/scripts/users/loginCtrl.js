(function (angular) {
	'use strict';

	var alert = this.alert,
		log = this.console.log;

	angular.module('eye-view-users')
	.controller('login', ['$scope', '$w', 'authenticator', function ($s, $w, auth) {
		$s.username = null;
		$s.password = null;
		$s.submit = function (form) {
			if (!form.$valid) {
				return;
			}
			auth.login($s.username, $s.password).then(function (currentUser) {
				$w.location.href = '';
			}, function (reason) {
				alert(reason);
			});
		};
	}]);

}).call(this, this.angular);