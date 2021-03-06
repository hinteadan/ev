﻿(function (angular) {
    'use strict';

    angular.module('eye-view-common', ['angularFileUpload', 'eye-view-users', 'eye-view-registration', 'pascalprecht.translate', 'ngCookies'])
	.config(['$routeProvider', '$translateProvider', function ($rp, $tp) {

	    $tp.determinePreferredLanguage();
	    //$tp.preferredLanguage('ro');
		$tp.useStaticFilesLoader({
			prefix: '/languages/',
			suffix: '.json'
		});
		//$tp.useLocalStorage();

		$rp.when('/createUser', { templateUrl: 'scripts/users/createUser.tmpl.html', controller: 'createUser' });
		$rp.when('/login', { templateUrl: 'scripts/users/login.tmpl.html', controller: 'login' });
		$rp.when('/about', { templateUrl: 'scripts/common/about.tmpl.html', controller: 'about' });
	}])
	.service('uiRouter', ['$window', '$timeout', 'authenticator', function ($w, $t, auth) {

		function routeByRole(role) {
			switch (role) {
				case 'Patient':
					if ($w.location.href.indexOf('index_patient.html') >= 0) {
						return;
					}
					$w.location.href = 'index_patient.html'; return;
				case 'Medic':
					if ($w.location.href.indexOf('index_medic.html') >= 0) {
						return;
					}
					$w.location.href = 'index_medic.html'; return;
				default: throw new Error('Inexistent role');
			}
		}

		function routeToLogin() {
		    $t(function () {
		        $w.location.href = '#/about';
		    }, 250);
		}

		this.route = function () {

			if ($w.location.hash === '#/createUser' || 
				$w.location.hash === '#/login' ||
                $w.location.hash === '#/about' ||
				$w.location.hash.indexOf('#/registration/confirm') >= 0) {
				return;
			}

			auth.authenticate().then(
				function (currentUser) {
					routeByRole(currentUser.role);
				},
				function () {
					routeToLogin();
				});
		};
	}])
    .controller('uiRouter', ['uiRouter', function (router) {
    	router.route();
    }])
	.service('jsParams', [function () {
		var params = {};

		this.set = function (key, value) {
			params[key] = value;
		};
		this.get = function (key) {
			var v = params[key] || null;
			delete params[key];
			return v;

		};
	}]);

}).call(this, this.angular);