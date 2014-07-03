(function (angular) {
    'use strict';

    angular.module('eye-view-patient')
    .controller('talkThreadCtrl', ['$scope', '$location', function ($s, $loc) {
        $s.inquire = function () {
            $loc.path('/inquire');
        };
    }]);

}).call(this, this.angular);