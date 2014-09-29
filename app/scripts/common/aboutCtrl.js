(function (angular) {
    'use strict';

    angular.module('eye-view-common')
    .controller('about', ['$scope', '$location', function ($s, $l) {

        $s.login = function () {
            $l.path('/login');
        };

        $s.register = function () {
            $l.path('/register');
        };
    }]);

}).call(this, this.angular);