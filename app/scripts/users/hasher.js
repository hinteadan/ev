(function (angular, JsSHA) {
	'use strict';

	angular.module('eye-view-users')
    .service('hasher', [function () {
    	function hashString(value) {
    		return new JsSHA(value, 'TEXT').getHash('SHA-512', 'HEX');
    	}

    	this.hash = hashString;
    }]);

}).call(this, this.angular, this.jsSHA);