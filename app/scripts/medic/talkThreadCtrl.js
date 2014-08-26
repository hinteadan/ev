(function (angular) {
    'use strict';

	var replyPrefix = 'RE: ';

    angular.module('eye-view-medic')
    .controller('threadCtrl', ['$scope', '$location', '$window', '$routeParams', 'messenger', 'jsParams', function ($s, $loc, $w, $rp, mess, params) {

    	mess.threadsForUser($rp.pid).then(function (messageThreads) {
    		
    		$s.messageThreads = messageThreads;
        });

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
        $s.respond = function (threadId) {
        	params.set('subject', generateSubject($s.messageThreads[threadId][0].Data.subject));
        	params.set('replyingTo', $s.messageThreads[threadId][0].Id);
        	params.set('threadId', threadId);

            $loc.path('/respond/' + $rp.pid);
        };
        $s.openImage = function (image) {
            window.open(mess.imageUrl(image.id));
        };
        $s.viewDiscussions = function () {
            $loc.path('/');
        };
    }]);

}).call(this, this.angular);