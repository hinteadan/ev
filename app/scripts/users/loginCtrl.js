(function (angular) {
	'use strict';

	angular.module('eye-view-users')
	.controller('login', ['$scope', '$window', 'authenticator', 'uiNotifier', function ($s, $w, auth, notify) {
		$s.username = null;
		$s.password = null;
		$s.submit = function (form) {
			if (!form.$valid) {
				return;
			}
			auth.login($s.username, $s.password).then(function () {
			    notify.success('Logging in...');
				$w.location.href = '';
			}, function (reason) {
			    notify.error(reason);
			});
		};
		$s.logout = function () {
			auth.logout();
			$w.location.href = '';
		};
	}]);

}).call(this, this.angular);