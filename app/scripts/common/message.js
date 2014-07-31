(function (angular) {
	'use strict';

	var messageBg = {
			'default': 'bg-orange',
			'rootInquiry': 'bg-red',
			'patientReply': 'bg-aqua',
			'medicReply': 'bg-blue'
		},
		messageIcon = {
			'default': 'fa-envelope',
			'rootInquiry': 'fa-wheelchair',
			'patientReply': 'fa-user',
			'medicReply': 'fa-user-md'
		};

	function Message(inReplyTo, userId, subject, patientId) {
		var self = this;

		this.inReplyTo = inReplyTo || null;
		this.isRoot = inReplyTo ? false : true;
		this.patientId = patientId || userId || null;
		this.writerId = userId || null;
		this.writerName = this.writerId;

		this.createdOn = new Date().getTime();
		this.sentOn = null;

		this.subject = subject || null;
		this.content = null;
		this.questionnaire = null;
		this.images = [];

		this.set = function (property, value) {
			self[property] = value;
			return self;
		};

		this.markSent = function () {
			self.sentOn = new Date().getTime();
			return self;
		};

		this.isFromPatient = function () {
			return self.patientId === self.writerId;
		};

		this.css = function () {
			var type = self.isRoot ? 'rootInquiry' : self.isFromPatient() ? 'patientReply' : 'medicReply';
			return (messageIcon[type] || messageIcon.default) + ' ' + (messageBg[type] || messageBg.default);
		};

		this.meta = function () {
			return {
				writerId: self.writerId,
				patientId: self.patientId,
				isRoot: self.isRoot,
				inReplyTo: self.inReplyTo,
				createdOn: self.createdOn,
				sentOn: self.sentOn
			};
		};
	}
	Message.fromDto = function (dto) {
		var message = new Message();
		for (var property in dto) {
			if (property === 'createdOn') {
				message.createdOn = new Date(Number(dto.createdOn));
				continue;
			}
			if (property === 'sentOn') {
				message.sentOn = dto.sentOn ? new Date(Number(dto.sentOn)) : null;
				continue;
			}
			message[property] = dto[property];
		}
		return message;
	};

	angular.module('eye-view-common').value('Message', Message);

}).call(this, this.angular);