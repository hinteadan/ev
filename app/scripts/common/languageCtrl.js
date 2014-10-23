(function (angular) {
	'use strict';

	angular.module('eye-view-common')
    .controller('languageCtrl', ['$scope', '$translate', '$cookieStore', function ($s, $t, $c) {

        var storeKey = 'userPreferredLanguage',
            currentLanguage = $t.preferredLanguage();

        function setLanguage(lang) {
            $t.use(lang);
            currentLanguage = lang;
            $c.put(storeKey, lang);
        }

    	$s.setLanguage = setLanguage;

    	$s.currentLanguage = function () {
    		return currentLanguage;
    	};

    	setLanguage($c.get(storeKey) || $t.preferredLanguage());
    }]);

}).call(this, this.angular);