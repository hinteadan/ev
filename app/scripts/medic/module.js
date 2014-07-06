(function (angular) {
	'use strict';

	angular.module('eye-view-medic', ['ngRoute', 'angularFileUpload', 'eye-view-common', 'eye-view-users'])
    .config(['$routeProvider', function ($routeProvider) {

    	$routeProvider
            .when('/', { templateUrl: 'scripts/medic/discussionsList.tmpl.html', controller: 'disussionsList' })
            .otherwise({ redirectTo: '/' });

    }]);

}).call(this, this.angular);