(function (angular) {
	'use strict';

	var roles = {
		patient: 'Patient',
		medic: 'Medic'
	};

	function User(username, name, email, role) {
		this.username = username || null;
		this.name = name || null;
		this.email = email || null;
		this.role = role || roles.patient;
		this.profileImageUrl = null;
	}

	angular.module('eye-view-users').value('User', User);

}).call(this, this.angular);