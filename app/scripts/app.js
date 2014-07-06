(function (angular) {
    'use strict';

	angular.module('eye-view', ['ngRoute', 'eye-view-users', 'eye-view-patient'])
	.config(['$routeProvider', function ($rp) {
		$rp.when('/createUser', { templateUrl: 'scripts/users/createUser.tmpl.html', controller: 'createUser' });
		$rp.when('/login', { templateUrl: 'scripts/users/login.tmpl.html', controller: 'login' });
	}])
    .service('uiRouter', ['$window', 'authenticator', function ($w, auth) {

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
    		$w.location.href = '/#/login';
    	}

    	this.route = function () {

    		if ($w.location.hash === '#/createUser' || $w.location.hash === '#/login') {
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
    }]);

}).call(this, this.angular);
