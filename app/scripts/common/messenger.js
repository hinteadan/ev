(function (angular, hds, _) {
	'use strict';

	var is = hds.is;

	angular.module('eye-view-common')
    .service('messenger', ['$upload', '$q', 'dataStore', 'notifier', 'NotifiyUser', function ($upload, $q, ds, notify, NotifiyUser) {

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
    			notify.user(new NotifiyUser(message.patientId, message.patientId, 'hintea_dan@yahoo.co.uk'));
    			deferred.resolve(result.data);
    		});

    		return deferred.promise;
    	};

    	this.threadForUser = function (userId) {
    		var deferred = $q.defer(),
        		query = hds.queryWithAnd()
				.where('patientId')(is.EqualTo)(userId);

    		ds.store.Query(query, function (result) {
    			/// <param name='result' type='hds.OperationResult' />
    			if (!result.isSuccess) {
    				deferred.reject(result.reason);
    				return;
    			}
    			deferred.resolve(_(result.data).reverse().value());
    		});

    		return deferred.promise;
    	};

    }]);

}).call(this, this.angular, this.H.DataStore, this._);