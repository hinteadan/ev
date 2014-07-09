(function (angular) {
	'use strict';

	var log = this.console.log,
		replyPrefix = 'RE: ';

	angular.module('eye-view-patient')
    .controller('talkThreadCtrl', ['$scope', '$location', '$window', 'messenger', 'authenticator', 'jsParams', function ($s, $loc, $w, mess, auth, params) {

        auth.authenticate().then(function (user) {
            mess.threadForUser(user.username).then(function (messages) {
                $s.messages = messages;
            }, log);
        }, log);

    	function imageCssUrl(id) {
    		return id ? 'url(' + mess.imageUrl(id) + ')' : 'none';
    	}

    	function generateSubject(subject) {
    		if (!subject) {
    			return null;
    		}
    		if (subject.indexOf(replyPrefix) === 0) {
    			return subject;
    		}
    		return replyPrefix + subject;
    	}

    	$s.messages = [];
    	$s.cssUrl = imageCssUrl;
    	$s.inquire = function () {
    		if ($s.messages.length) {
    			params.set('subject', generateSubject($s.messages[0].Data.subject));
    		}
    		$loc.path('/inquire');
    	};
    	$s.openImage = function (image) {
    		window.open(mess.imageUrl(image.id));
    	};

    }]);

}).call(this, this.angular);