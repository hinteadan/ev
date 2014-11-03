(function (angular, hds, _, moment) {
	'use strict';

	var is = hds.is,
		medicRole = 'Medic',
	    defaultDateFormat = 'D MMM YYYY, HH:mm';

	function parseToMoment(input) {
	    var mDate = moment(input);
	    if (!mDate.isValid()) {
	        mDate = moment(input, moment.ISO_8601);
	    }
	    return mDate;
	}

	angular.module('eye-view-common')
    .service('messenger', ['$upload', '$q', 'dataStore', 'usersDataStore', 'notifier', 'NotifiyUser', 'Message', 'User', function ($upload, $q, ds, uds, notify, NotifiyUser, Message, User) {

        var self = this;

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
					notify.users(usersToNotify, message);
					deferred.resolve(result.data);
				});
    		});

    		return deferred.promise;
    	};

    	this.threadsForUser = function (userId) {
    		var deferred = $q.defer(),
        		query = hds.queryWithAnd()
				.where('patientId')(is.EqualTo)(userId);

    		ds.store.Query(query, function (result) {
    			/// <param name='result' type='hds.OperationResult' />
    			if (!result.isSuccess) {
    				deferred.reject(result.reason);
    				return;
    			}

    			deferred.resolve(
					_(result.data)
					.reverse()
					.map(function (entity) {
    					entity.Data = Message.fromDto(entity.Data);
    					return entity;
					})
					.groupBy(function (e) { return e.Data.threadId; })
					.value());
    		});

    		return deferred.promise;
    	};

    	this.patientDetails = function (patientId) {
    	    var deferred = $q.defer(),
				query = hds.queryWithAnd().where('username')(is.EqualTo)(patientId);

    	    uds.store.Query(query, function (result) {
    	        /// <param name='result' type='hds.OperationResult' />
    	        if (!result.isSuccess) {
    	            deferred.reject(result.reason);
    	            return;
    	        }
    	        deferred.resolve(User.fromDto(result.data[0].Data));
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

    			ds.store.QueryMeta(hds.queryWithAnd()).then(function (res) {
    			    /// <param name='res' type='hds.OperationResult' />
    			    if (!res.isSuccess) {
    			        deferred.reject(res.reason);
    			        return;
    			    }

    			    res.data = _(res.data).reverse().value();

    			    deferred.resolve(
                        _(result.data)
                        .map(function (entity) {
                            var m = _.find(res.data, function (m) {
                                return m.Value.patientId === entity.Data.username;
                            });
                            return User.fromDto(entity.Data)
                                .set('latestMessageOn', m ? m.Value.sentOn : null)
                                .set('latestMessageOnFormatted', m ? parseToMoment(m.Value.sentOn).format(defaultDateFormat) : null);
                        })
                        .where(function (x) { return Boolean(x.latestMessageOn); })
                        .sortBy('latestMessageOn')
                        .reverse()
                        .value()
                    );
    			});
    		});
    		return deferred.promise;
    	};

    }]);

}).call(this, this.angular, this.H.DataStore, this._, this.moment);