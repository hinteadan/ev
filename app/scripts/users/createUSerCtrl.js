(function (angular, hds) {
	'use strict';

	var alert = this.alert;

	angular.module('eye-view-users')
	.controller('createUser', ['$scope', 'User', 'userRoles', 'usersDataStore', 'hasher', function ($s, User, userRoles, ds, hasher) {
		var userBeingCreated = new User();
		$s.user = userBeingCreated;
		$s.passwordPlain = null;
		$s.possibleRoles = userRoles;
		$s.submit = function (form) {
			if (!form.$valid) {
				return;
			}

			userBeingCreated.passwordHash = hasher.hash($s.passwordPlain);

			ds.store.Save(new hds.Entity(userBeingCreated, userBeingCreated.meta()), function (result) {
				/// <param name='result' type='hds.OperationResult' />
				if (!result.isSuccess) {
					alert('Error: ' + result.reason);
					return;
				}
				alert('User Saved!');
			});
		};
	}]);

}).call(this, this.angular, this.H.DataStore);