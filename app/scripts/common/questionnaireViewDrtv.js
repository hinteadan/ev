(function (angular) {
    'use strict';

    angular.module('eye-view-common').directive('questionnaireView', ['Questionnaire', function (Questionnaire) {
        return {
            restrict: 'E',
            replace: true,
            transclude: false,
            templateUrl: 'scripts/common/questionnaireView.tmpl.html',
            scope: {
                questionnaire: '='
            },
            link: function (scope) {
                scope.q = scope.questionnaire;
                scope.opts = Questionnaire.opts;
            }
        };

    }]);

}).call(this, this.angular);