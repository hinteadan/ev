(function (angular) {
    'use strict';

	var log = this.console.log,
		replyPrefix = 'RE: ';

    angular.module('eye-view-medic')
    .controller('threadCtrl', ['$scope', '$location', '$window', '$routeParams', 'messenger', 'jsParams', function ($s, $loc, $w, $rp, mess, params) {

        mess.threadForUser($rp.pid).then(function (messages) {
            $s.messages = messages;
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
        $s.respond = function () {
        	if ($s.messages.length) {
        		params.set('subject', generateSubject($s.messages[0].Data.subject));
        	}
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