(function (angular) {
	'use strict';

	angular.module('eye-view-common')
    .controller('languageCtrl', ['$scope', '$translate', function ($s, $t) {

    	var currentLanguage = $t.preferredLanguage();

    	$s.setLanguage = function (lang) {
    		$t.use(lang);
    		currentLanguage = lang;
    	};

    	$s.currentLanguage = function () {
    		console.log(currentLanguage);
    		return currentLanguage;
    	};
    }]);

}).call(this, this.angular);