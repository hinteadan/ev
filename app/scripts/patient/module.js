(function (angular) {
    'use strict';

    angular.module('eye-view-patient', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', { templateUrl: 'scripts/patient/talk-thread.tmpl.html', controller: 'talkThreadCtrl' })
            .otherwise({ redirectTo: '/' });

    }]);

}).call(this, this.angular);