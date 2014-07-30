(function (angular) {
    'use strict';

    angular.module('eye-view-patient').directive('questionnaireForm', ['Questionnaire', function (Questionnaire) {
        return {
            restrict: 'E',
            replace: true,
            transclude: false,
            templateUrl: 'scripts/patient/questionnaire.tmpl.html',
            scope: {
                questionnaire: '='
            },
            link: function (scope) {
                scope.q = scope.questionnaire || new Questionnaire();
                scope.qopts = Questionnaire.opts;
            }
        };

    }]);

}).call(this, this.angular);