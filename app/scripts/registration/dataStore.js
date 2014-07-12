(function (angular, ds) {
	'use strict';

	angular.module('eye-view-registration')
    .constant('httpStore.url', null)
    .service('registrationDataStore', ['httpStore.url', function (storeUrl) {
    	this.store = new ds.Store('eye-view-registration', storeUrl);
    }]);

}).call(this, this.angular, this.H.DataStore);