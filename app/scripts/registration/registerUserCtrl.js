(function (angular) {
    'use strict';

    var log = this.console.log;

    angular.module('eye-view-registration')
    .controller('registerUser', ['$scope', '$location', 'User', function ($s, $l, User) {

        var userBeingRegistered = new User();

        $s.user = userBeingRegistered;

        $s.pass = null;
        $s.passConfirm = null;



        $s.register = function (/*form*/) {
            log(userBeingRegistered);
        };

        $s.cancel = function () {
            $l.path('/login');
        };

    }]);

}).call(this, this.angular);