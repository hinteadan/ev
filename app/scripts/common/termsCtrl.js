(function (angular) {
    'use strict';

    angular.module('eye-view-common')
    .controller('termsCtrl', ['$scope', '$window', function ($s, $w) {
        $s.viewTerms = function () {
            $w.open('/tc.html', '_blank');
        };
    }]);

}).call(this, this.angular);