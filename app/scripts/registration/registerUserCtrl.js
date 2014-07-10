(function (angular) {
    'use strict';

    var log = this.console.log;

    angular.module('eye-view-registration')
    .controller('registerUser', ['$scope', '$location', '$timeout', 'User', function ($s, $l, $t, User) {

        var userBeingRegistered = new User();

        $s.user = userBeingRegistered;

        $s.pass = null;
        $s.passConfirm = null;



        $s.register = function (/*form*/) {
            log(userBeingRegistered);
        };

        $s.cancel = function () {
            if (!$s.cancel.confirm) {
                $s.cancel.confirm = true;
                $t(function () {
                    delete $s.cancel.confirm;
                }, 5000);
                return;
            }

            delete $s.cancel.confirm;

            $l.path('/login');
        };

    }]);

}).call(this, this.angular);