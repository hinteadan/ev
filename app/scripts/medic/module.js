﻿(function (angular) {
	'use strict';

	angular.module('eye-view-medic', ['ngRoute', 'angularFileUpload', 'eye-view-common'])
    .config(['$routeProvider', function ($routeProvider) {

    	$routeProvider
            .when('/', { templateUrl: 'scripts/medic/discussionsList.tmpl.html', controller: 'disussionsList' })
            .when('/thread/:pid', { templateUrl: 'scripts/medic/talk-thread.tmpl.html', controller: 'threadCtrl' })
            .otherwise({ redirectTo: '/' });

    }]);

}).call(this, this.angular);