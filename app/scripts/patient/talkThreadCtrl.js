﻿(function (angular) {
	'use strict';

	var replyPrefix = 'RE: ';

	angular.module('eye-view-patient')
    .controller('talkThreadCtrl', ['$scope', '$location', '$window', 'messenger', 'authenticator', 'jsParams', function ($s, $loc, $w, mess, auth, params) {

        auth.authenticate().then(function (user) {
        	mess.threadsForUser(user.username).then(function (messageThreads) {
        		$s.messageThreads = messageThreads;
            });
        });

        function imageUrl(id) {
        	return id ? mess.imageUrl(id) : '';
        }

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

    	$s.messageThreads = [];
    	$s.cssUrl = imageCssUrl;
    	$s.imgUrl = imageUrl;
    	$s.inquire = function () {
    		$loc.path('/inquire');
    	};
    	$s.replyOn = function (threadId) {
    		params.set('subject', generateSubject($s.messageThreads[threadId][0].Data.subject));
    		params.set('replyingTo', $s.messageThreads[threadId][0].Id);
    		params.set('threadId', threadId);
    		$loc.path('/inquire');
    	};
    	$s.openImage = function (image) {
    		window.open(mess.imageUrl(image.id));
    	};

    }]);

}).call(this, this.angular);