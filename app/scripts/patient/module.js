(function (angular) {
    'use strict';

    angular.module('eye-view-patient', ['ngRoute', 'angularFileUpload', 'eye-view-common'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', { templateUrl: 'scripts/patient/talk-thread.tmpl.html', controller: 'talkThreadCtrl' })
			.when('/inquire/:replyingTo', { templateUrl: 'scripts/patient/send-inquiry.tmpl.html', controller: 'sendInquiryCtrl' })
            .when('/inquire', { templateUrl: 'scripts/patient/send-inquiry.tmpl.html', controller: 'sendInquiryCtrl' })
            .otherwise({ redirectTo: '/' });

    }]);

}).call(this, this.angular);