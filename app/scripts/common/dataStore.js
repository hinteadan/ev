(function (angular, ds) {
    'use strict';

    angular.module('eye-view-common')
    .constant('httpStore.url', null)
    .service('dataStore', ['httpStore.url', function (storeUrl) {
        this.store = new ds.Store('eye-view', storeUrl);
        this.blob = new ds.BlobStore(storeUrl);
    }]);

}).call(this, this.angular, this.H.DataStore);