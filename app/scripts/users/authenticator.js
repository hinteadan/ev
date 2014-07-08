(function (angular, localStorage, hds) {
	'use strict';

	var storeKey = {
			userId: 'userId',
			loggedOn: 'loggedOn'
		},
		timeoutInMs = 20 * 60 * 1000,//20 minutes
		is = hds.is; 

	angular.module('eye-view-users')
	.service('authenticator', ['$q', '$rootScope', 'usersDataStore', 'User', 'hasher', function ($q, $root, ds, User, hasher) {
		var currentUser = null;

		this.authenticate = function () {
			var deff = $q.defer();

			if (!localStorage[storeKey.userId]) {
				deff.reject('Nobody is logged in on this device');
			}
			else if (new Date().getTime() - Number(localStorage[storeKey.loggedOn]) >= timeoutInMs) {
				localStorage.removeItem(storeKey.loggedOn);
				localStorage.removeItem(storeKey.userId);
				deff.reject('Latest login timed out');
			}
			else {
				ds.store.Load(localStorage[storeKey.userId], function (result) {
					/// <param name='result' type='H.DataStore.OperationResult' />
					currentUser = User.fromDto(result.data.Data);
					$root.currentUser = currentUser;
					deff.resolve(currentUser);
				});
			}

			return deff.promise;
		};
		this.login = function (username, password) {
			var deff = $q.defer(),
				query = new hds.queryWithAnd()
					.where('username')(is.EqualTo)(username)
					.where('password')(is.EqualTo)(hasher.hash(password));

			ds.store.Query(query, function (result) {
				/// <param name='result' type='H.DataStore.OperationResult' />
				if (!result.isSuccess || result.data.length === 0) {
					deff.reject('Invalid username and/or password');
					return;
				}
				currentUser = User.fromDto(result.data[0].Data);
				localStorage[storeKey.userId] = result.data[0].Id;
				localStorage[storeKey.loggedOn] = new Date().getTime();
				$root.currentUser = currentUser;
				deff.resolve(currentUser);
			});
			
			return deff.promise;
		};
		this.logout = function () {
			localStorage.removeItem(storeKey.loggedOn);
			localStorage.removeItem(storeKey.userId);
			$root.currentUser = null;
		};
	}]);

}).call(this, this.angular, this.localStorage, this.H.DataStore);