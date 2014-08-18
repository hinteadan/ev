(function (angular) {
	'use strict';

	angular.module('eye-view-common')
    .controller('languageCtrl', ['$scope', '$translate', function ($s, $t) {
    	$s.setLanguage = function (lang) {
    		$t.use(lang);
    	};
    }]);

}).call(this, this.angular);