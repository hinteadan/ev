(function (angular, hds, _) {
	'use strict';

	var is = hds.is,
		medicRole = 'Medic';

	angular.module('eye-view-common')
    .service('messenger', ['$upload', '$q', 'dataStore', 'usersDataStore', 'notifier', 'NotifiyUser', 'Message', function ($upload, $q, ds, uds, notify, NotifiyUser, Message) {

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

    			var query = hds.queryWithOr().where('role')(is.EqualTo)(medicRole);
    			if (message.writerId !== message.patientId) {
    				query = query.where('username')(is.EqualTo)(message.patientId);
    			}

    			uds.store.Query(query)
				.then(function (result) {
					/// <param name='result' type='hds.OperationResult' />
					if (!result.isSuccess) {
						return;
					}
					var usersToNotify = _.select(result.data, function (e) { return e.Data.username !== message.writerId; }).map(function (entity) {
						/// <param name='entity' type='hds.Entity' />
						return new NotifiyUser(entity.Data.username, entity.Data.name, entity.Data.email);
					});
					notify.users(usersToNotify);
					deferred.resolve(result.data);
				});
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
    			deferred.resolve(_(result.data).reverse().map(function (entity) {
    				entity.Data = Message.fromDto(entity.Data);
    				return entity;
    			}).value());
    		});

    		return deferred.promise;
    	};

    	this.patients = function () {
    		var deferred = $q.defer(),
				query = hds.queryWithAnd().where('role')(is.EqualTo)('Patient');
    		uds.store.Query(query, function (result) {
    			/// <param name='result' type='hds.OperationResult' />
    			if (!result.isSuccess) {
    				deferred.reject(result.reason);
    				return;
    			}
    			deferred.resolve(_.map(result.data, function (entity) {
    			    return entity.Data;
    			}));
    		});
    		return deferred.promise;
    	};

    }]);

}).call(this, this.angular, this.H.DataStore, this._);