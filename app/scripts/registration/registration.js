(function (angular, hds) {
	'use strict';

	var log = this.console.log,
		is = hds.is;

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

	angular.module('eye-view-registration')
    .service('registration', ['$q', '$http', '$window', 'hasher', 'usersDataStore', 'registrationDataStore', function ($q, $http, $w, hasher, uds, rds) {

    	function checkIfUsernameIsUnique(username) {
    		var deff = $q.defer(),
    			query = hds.queryWithAnd().where('username')(is.EqualTo)(username);

    		uds.store.QueryMeta(query).then(function (result) {
    			/// <param name='result' type='H.DataStore.OperationResult' />
    			if (!result.isSuccess) {
    				deff.reject(result.reason);
    				return;
    			}
    			deff.resolve(result.data.length === 0);
    		});

    		return deff.promise;
    	}

    	function generateConfirmationUrl(hash) {
    		return $w.location.href.replace(new RegExp($w.location.hash, 'gi'), '') + '#/registration/confirm/' + hash;
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

    }]);

}).call(this, this.angular, this.H.DataStore);