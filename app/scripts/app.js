(function (angular) {
    'use strict';

	angular.module('eye-view', ['ngRoute', 'eye-view-users'])
	.config(['$routeProvider', function ($rp) {
		$rp.when('/createUser', { templateUrl: 'scripts/users/createUser.tmpl.html', controller: 'createUser' });
	}])
    .service('uiRouter', ['$window', function ($w) {
    	this.route = function () {
    		if ($w.location.hash === '#/createUser') {
    			return;
    		}
            $w.location.href = 'index_patient.html';
        };
    }])
    .controller('uiRouter', ['uiRouter', function (router) {
        router.route();
    }]);

}).call(this, this.angular);
