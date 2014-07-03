(function (angular) {
    'use strict';

    angular.module('eye-view-patient')
    .controller('sendInquiryCtrl', ['$scope', '$upload', function ($s, $upload) {
        $s.onFileSelect = function ($files) {

            console.log($files);

        };
    }]);

}).call(this, this.angular);