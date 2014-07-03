(function (angular, hds) {
    'use strict';

    angular.module('eye-view-common')
    .service('messenger', ['$upload', '$q', 'dataStore', function ($upload, $q, ds) {
        
        this.uploadImage = function (file, data) {
            return $upload.upload({
                url: ds.blob.UploadUrl(),
                data: data,
                file: file
            });
        };
        this.imageUrl = function (id) {
            return ds.blob.UrlFor(id);
        };

        this.send = function (message) {
        	var deferred = $q.defer();

        	ds.store.Save(new hds.Entity(message, message.meta()), function (result) {
        		/// <param name='result' type='hds.OperationResult' />
        		if (!result.isSuccess) {
        			deferred.reject(result.reason);
        			return;
        		}
        		deferred.resolve(result.data);
        	});

        	return deferred.promise;
        };

    }]);

}).call(this, this.angular, this.H.DataStore);