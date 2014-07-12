(function (angular, hds) {
	'use strict';

	var is = hds.is;

	function PendingUser(user, hash) {
		var self = this;
		this.user = user;
		this.hash = hash;
		this.createdOn = new Date().getTime();

		this.meta = function () {
			return {
				username: self.user.username,
				email: self.user.email,
				createdOn: self.createdOn,
				hash: self.hash
			};
		};
	}
	PendingUser.fromDto = function (dto, userFactory) {
		var user = new PendingUser();
		for (var property in dto) {
			if (property === 'user') {
				user.user = userFactory ? userFactory(dto.user) : dto.user;
				continue;
			}
			if (property === 'createdOn') {
				user.createdOn = new Date(Number(dto.createdOn));
				continue;
			}
			user[property] = dto[property];
		}
		return user;
	};

	angular.module('eye-view-registration')
    .service('registration', ['$q', '$http', '$window', 'hasher', 'usersDataStore', 'registrationDataStore', function ($q, $http, $w, hasher, uds, rds) {

    	function checkIfUsernameIsUnique(username) {
    		var deff = $q.defer(),
    			query = hds.queryWithAnd().where('username')(is.EqualTo)(username);

    		uds.store.Query(query).then(function (result) {
    			/// <param name='result' type='H.DataStore.OperationResult' />
    			if (!result.isSuccess) {
    				deff.reject(result.reason);
    				return;
    			}
    			deff.resolve(result.data.length === 0 || (result.data.length === 1 && result.data[0].Data === null));
    		});

    		return deff.promise;
    	}

    	function generateConfirmationUrl(hash) {
    		return $w.location.href.replace(new RegExp($w.location.hash, 'gi'), '') + '#/registration/confirm/' + hash;
    	}

    	function concreteUserFromPending(pendingUserEntityId, pendingUser) {
    		var topDeff = $q.defer();

    		uds.store.Save(pendingUser.user).then(function (result) {
    			/// <param name='result' type='H.DataStore.OperationResult' />
    			if (!result.isSuccess) {
    				topDeff.reject(result.reason);
    				return;
    			}
    			rds.store.Delete(pendingUserEntityId);
    			topDeff.resolve(pendingUser.user);
    		});

    		return topDeff.promise;
    	}

    	function confirmPendingUser(pendingUserEntityId, pendingUser) {
    		var topDeff = $q.defer();

    		checkIfUsernameIsUnique(pendingUser.user.username)
			.then(function (isUnique) {
				if (!isUnique) {
					topDeff.reject('The requested username, "' +
						pendingUser.user.username +
						'", was confirmed by someone else in the meantime.' +
						' Please register another account with a different username.');
					return false;
				}
				return concreteUserFromPending(pendingUserEntityId, pendingUser);
			}, topDeff.reject)
			.then(topDeff.resolve, topDeff.reject);

    		return topDeff.promise;
    	}

    	this.queueForConfirmation = function (user) {
    		var deff = $q.defer();

    		checkIfUsernameIsUnique(user.username)

				.then(function (isUnique) {
    				if (!isUnique) {
    					deff.reject('The specified username already exists, please choose another');
    					return false;
    				}

    				return new PendingUser(user, hasher.hash(user.username + user.email));

    			}, function (reason) { deff.reject(reason); return reason; })

				.then(function (pendingUser) {
					var d = $q.defer();

    				if (!pendingUser) {
    					return;
    				}

    				rds.store.Save(new hds.Entity(pendingUser, pendingUser.meta())).then(function (result) {
    					/// <param name='result' type='H.DataStore.OperationResult' />
    					if (!result.isSuccess) {
    						d.reject(result.reason);
    						return;
    					}
    					d.resolve({ id: result.data.Id, pendingUser: pendingUser });
    				});

    				return d.promise;
				})

    			.then(function (result) {
    				if (!result) {
    					return;
    				}

    				deff.resolve(generateConfirmationUrl(result.pendingUser.hash));

    			}, function (reason) { deff.reject(reason); return reason; });

    		return deff.promise;
    	};

    	this.validate = function (hash) {
    		var topDeff = $q.defer(),
				query = hds.queryWithAnd().where('hash')(is.EqualTo)(hash);

    		rds.store.Query(query).then(function (result) {
    			/// <param name='result' type='H.DataStore.OperationResult' />
    			if (!result.isSuccess || result.data.length === 0) {
    				topDeff.reject('Invalid confirmation URL');
    				return;
    			}
    			confirmPendingUser(result.data[0].Id, PendingUser.fromDto(result.data[0].Data))
				.then(topDeff.resolve, topDeff.reject);
    		});

    		return topDeff.promise;
    	};

    }]);

}).call(this, this.angular, this.H.DataStore);