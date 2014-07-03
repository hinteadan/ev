(function (angular, ds) {
    'use strict';

    angular.module('eye-view-common')
    .service('dataStore', [function () {
        this.store = new ds.Store('eye-view');
        this.blob = new ds.BlobStore();
    }]);

}).call(this, this.angular, this.H.DataStore);