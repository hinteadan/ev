(function (angular) {
    'use strict';

    angular.module('eye-view-registration')
    .controller('registerUser', ['$scope', '$location', '$timeout', 'User', 'registration', 'hasher', 'uiNotifier', 'notifier', function ($s, $l, $t, User, registration, hasher, uiNotifier, notify) {

        var userBeingRegistered = new User();

        $s.user = userBeingRegistered;

        $s.pass = null;
        $s.passConfirm = null;



        $s.register = function (/*form*/) {

        	//validate form

        	userBeingRegistered.passwordHash = hasher.hash($s.pass);

        	registration.queueForConfirmation(userBeingRegistered).then(function (confirmationUrl) {
        		notify.userRegistration(userBeingRegistered.email, confirmationUrl);
        	}, uiNotifier.error);
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