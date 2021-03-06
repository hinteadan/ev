﻿(function (angular, _) {
	'use strict';

	var c = this.console;

	function User(username, name, email) {
		this.email = email || null;
		this.name = name  || null;
		this.username = username || null;
	}

	function MandrillEmailNotifier($http, apiKey) {
		var baseUrl = 'https://mandrillapp.com/api/1.0/',
			template = {
				notification: 'eye-view-notification',
				registration: 'eye-view-registration-confirm'
			};

		function urlFor(call) {
			return baseUrl + call;
		}

		function sendNotificationMessageTo(user, message) {
			/// <param name='user' type='User' />

			var to = !angular.isArray(user) ?
					[{
						'email': user.email,
						'name': user.name
					}] :
					_.map(user, function (u) {
						return {
							'email': u.email,
							'name': u.name
						};
					});

			$http.post(urlFor('messages/send-template.json'), {
				'key': apiKey,
				'template_name': template.notification,
				'template_content': [
					//{
					//	'name': 'example name',
					//	'content': 'example content'
					//}
				],
				'message': {
					'to': to,
					'merge': true,
					'global_merge_vars': [
						{
							'name': 'writtenBy',
							'content': message.writerName || message.writerId
						},
						{
							'name': 'subject',
							'content': message.subject
						},
						{
							'name': 'content',
							'content': message.content
						},
						{
							'name': 'replyUrl',
							'content': '[N/A]'
						}
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
						'eye-view', 'notification'
					]
				}
			}).then(c.log, c.log);
		}

		function sendUserRegistrationEmailTo(user, confirmationUrl) {
			/// <param name='user' type='User' />
			$http.post(urlFor('messages/send-template.json'), {
				'key': apiKey,
				'template_name': template.registration,
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
						{
							'name': 'CONFIRMATIONURL',
							'content': confirmationUrl
						},
                        {
                            'name': 'USERNAME',
                            'content': user.username
                        },
                        {
                            'name': 'PASSWORD',
                            'content': '[Hidden for your own security - use the \'forgot password\' functionality if you can\'t remember it]'
                        }
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
						'eye-view', 'registration', 'confirmation'
					]
				}
			}).then(c.log, c.log);
		}

		this.user = sendNotificationMessageTo;
		this.users = sendNotificationMessageTo;
		this.userRegistration = sendUserRegistrationEmailTo;
	}

	angular.module('eye-view-common')
	.value('NotifiyUser', User)
	.constant('mandrillApiKey', '-L0AqJmsBCMZo_oBbRc5lg')
	.service('notifier', ['$http', 'mandrillApiKey', MandrillEmailNotifier]);

}).call(this, this.angular, this._);