(function (angular) {
	'use strict';

	function Message(inReplyTo, userId, subject, patientId) {
		var self = this;

		this.inReplyTo = inReplyTo || null;
		this.isRoot = inReplyTo ? false : true;
		this.patientId = patientId || userId || null;
		this.writerId = userId || null;

		this.createdOn = new Date();
		this.sentOn = null;

		this.subject = subject || null;
		this.content = null;
		this.images = [];

		this.markSent = function () {
			self.sentOn = new Date();
			return self;
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

	angular.module('eye-view-common').value('Message', Message);

}).call(this, this.angular);