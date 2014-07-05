(function (angular) {
	'use strict';

	var c = this.console;

	function User(username, name, email) {
		this.email = email || null;
		this.name = name  || null;
		this.username = username || null;
	}

	function ConsoleNotifier() {

		this.user = function (user) {
			/// <param name='user' type='User' />
			c.info('To ' + user.name + ': You have a new reply from Eye-View.');
		};

	}

	angular.module('eye-view-common')
	.value('NotifiyUser', User)
	.service('notifier', [ConsoleNotifier]);

}).call(this, this.angular);