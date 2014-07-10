(function (angular) {
    'use strict';

    angular.module('eye-view-registration', ['ngRoute', 'eye-view-common'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/register', { templateUrl: 'scripts/registration/registrationForm.tmpl.html', controller: 'registerUser' });

    }]);

}).call(this, this.angular);