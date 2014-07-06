(function (angular) {
    'use strict';

	angular.module('eye-view', ['ngRoute', 'eye-view-users'])
	.config(['$routeProvider', function ($rp) {
		$rp.when('/createUser', { templateUrl: 'scripts/users/createUser.tmpl.html', controller: 'createUser' });
		$rp.when('/login', { templateUrl: 'scripts/users/login.tmpl.html', controller: 'login' });
	}])
    .service('uiRouter', ['$window', '$location', 'authenticator', function ($w, $l, auth) {

    	function routeByRole(role) {
    		switch (role) {
    			case 'Patient': $w.location.href = 'index_patient.html'; return;
    			case 'Medic': $w.location.href = 'index_medic.html'; return;
    			default: throw new Error('Inexistent role'); return;
    		}
    	}

    	function routeToLogin() {
    		$l.path('/login');
    	}

    	this.route = function () {

    		if ($w.location.hash === '#/createUser' || $w.location.hash === '#/login') {
    			return;
    		}

    		auth.authenticate().then(
				function (currentUser) {
					routeByRole(currentUser.role);
				},
				function (reason) {
					routeToLogin();
				});
        };
    }])
    .controller('uiRouter', ['uiRouter', function (router) {
        router.route();
    }]);

}).call(this, this.angular);
