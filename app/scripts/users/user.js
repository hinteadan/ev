(function (angular) {
	'use strict';

	var roles = {
		patient: 'Patient',
		medic: 'Medic'
	};

	function User(username, name, email, role) {
		var self = this;
		this.username = username || null;
		this.passwordHash = null;
		this.name = name || null;
		this.email = email || null;
		this.role = role || roles.patient;
		this.profileImageUrl = null;

		this.meta = function () {
			return {
				username: self.username,
				password: self.passwordHash,
				name: self.name,
				email: self.email,
				role: self.role
			};
		};
	}
	User.fromDto = function (dto) {
		var user = new User();
		for (var property in dto) {
			user[property] = dto[property];
		}
		return user;
	};

	angular.module('eye-view-users')
	.value('userRoles', roles)
	.value('User', User);

}).call(this, this.angular);