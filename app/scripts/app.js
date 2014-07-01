(function (angular) {
    'use strict';

    angular.module('eye-view', ['ngRoute'])
    .service('uiRouter', ['$window', function ($w) {
        this.route = function () {
            $w.location.href = 'index_patient.html';
        };
    }])
    .controller('uiRouter', ['uiRouter', function (router) {
        router.route();
    }]);

}).call(this, this.angular);
