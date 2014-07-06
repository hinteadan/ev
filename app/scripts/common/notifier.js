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

	function MandrillEmailNotifier($http, apiKey) {
		var baseUrl = 'https://mandrillapp.com/api/1.0/',
			notificationTemplateName = 'eye-view-notification';

		function urlFor(call) {
			return baseUrl + call;
		}

		function sendNotificationMessageTo(user) {
			/// <param name='user' type='User' />
			$http.post(urlFor('messages/send-template.json'), {
				'key': apiKey,
				'template_name': notificationTemplateName,
				'template_content': [
					//{
					//	'name': 'example name',
					//	'content': 'example content'
					//}
				],
				'message': {
					'to': [
						{
							'email': user.email,
							'name': user.name,
							'type': 'to'
						}
					],
					'merge': true,
					'global_merge_vars': [
						//{
						//	'name': 'merge1',
						//	'content': 'merge1 content'
						//}
					],
					'merge_vars': [
						//{
						//	'rcpt': 'recipient.email@example.com',
						//	'vars': [
						//		{
						//			'name': 'merge2',
						//			'content': 'merge2 content'
						//		}
						//	]
						//}
					],
					'tags': [
						'eye-view', 'notification', user.username, user.name
					]
				}
			}).then(c.log, c.log);
		}

		this.user = sendNotificationMessageTo;
	}

	angular.module('eye-view-common')
	.value('NotifiyUser', User)
	.constant('mandrillApiKey', '-L0AqJmsBCMZo_oBbRc5lg')
	.service('notifier', ['$http', 'mandrillApiKey', MandrillEmailNotifier]);

}).call(this, this.angular);