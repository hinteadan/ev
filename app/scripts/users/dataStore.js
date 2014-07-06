(function (angular, ds) {
	'use strict';

	angular.module('eye-view-users')
    .constant('httpStore.url', null)
    .service('dataStore', ['httpStore.url', function (storeUrl) {
    	this.store = new ds.Store('eye-view-users', storeUrl);
    }]);

}).call(this, this.angular, this.H.DataStore);