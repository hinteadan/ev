(function (angular) {
	'use strict';

	var alert = this.alert;

	angular.module('eye-view-users')
	.controller('login', ['$scope', '$window', 'authenticator', function ($s, $w, auth) {
		$s.username = null;
		$s.password = null;
		$s.submit = function (form) {
			if (!form.$valid) {
				return;
			}
			auth.login($s.username, $s.password).then(function () {
				$w.location.href = '';
			}, function (reason) {
				alert(reason);
			});
		};
		$s.logout = function () {
			auth.logout();
			$w.location.href = '';
		};
	}]);

}).call(this, this.angular);