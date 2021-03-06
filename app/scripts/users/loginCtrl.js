﻿(function (angular) {
	'use strict';

	angular.module('eye-view-users')
	.controller('login', ['$scope', '$window', '$location', 'authenticator', 'uiNotifier', 'jsParams', function ($s, $w, $l, auth, notify, p) {
		$s.username = p.get('username') || null;
		$s.password = null;
		$s.submit = function (form) {
			if (!form.$valid) {
				return;
			}
			$s.submit.ting = true;
			auth.login($s.username, $s.password).then(function () {
				notify.success('Logging in...');
				delete $s.submit.ting;
				$s.submit.ted = true;
			    $w.location.href = 'index.html';
			}, function (reason) {
				notify.error(reason);
				delete $s.submit.ting;
			});
		};
		$s.logout = function () {
			auth.logout();
			$w.location.href = 'index.html';
		};
	}]);

}).call(this, this.angular);