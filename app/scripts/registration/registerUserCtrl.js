(function (angular) {
    'use strict';

    angular.module('eye-view-registration')
    .controller('registerUser', ['$scope', '$location', '$timeout', '$window', 'User', 'registration', 'hasher', 'uiNotifier', 'notifier', function ($s, $l, $t, $w, User, registration, hasher, uiNotifier, notify) {

        var userBeingRegistered = new User();

        function validateForm(form) {
        	if (!form.$valid) {
        		return false;
        	}

        	if ($s.pass !== $s.passConfirm) {
        		uiNotifier.warning('The password confirmation doesn\'t match the given password. Please re-type them both.');
        		return false;
        	}

        	return true;
        }

        $s.user = userBeingRegistered;

        $s.pass = null;
        $s.passConfirm = null;

        $s.register = function (form) {

        	if (!validateForm(form)) {
        		return;
        	}

        	userBeingRegistered.passwordHash = hasher.hash($s.pass);

        	$s.register.ing = true;

        	registration.countPatients().then(function (cnt) {
        	    if(cnt >= 200) {
        	        uiNotifier.error("Maximum number of free accounts (200) has been reached!");
        	        delete $s.register.ing;
        	        return false;
        	    }

        	    registration.queueForConfirmation(userBeingRegistered).then(function (confirmationUrl) {
        	        notify.userRegistration(userBeingRegistered, confirmationUrl);
        	        delete $s.register.ing;
        	        $s.register.ed = true;
        	    }, function (reason) {
        	        uiNotifier.error(reason);
        	        delete $s.register.ing;
        	    });

        	});
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

            $l.path('/about');
        };
        $s.goHome = function () {
        	$l.path('/login');
        };
        $s.viewTerms = function () {
            $w.open('/tc.html', '_blank');
        };

        $s.patientsCount = null;
        registration.countPatients().then(function (cnt) {
            $s.patientsCount = 200 - cnt;
        });

    }]);

}).call(this, this.angular);