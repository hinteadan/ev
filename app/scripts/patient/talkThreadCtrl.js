(function (angular) {
	'use strict';

	var log = this.console.log;

	angular.module('eye-view-patient')
    .controller('talkThreadCtrl', ['$scope', '$location', '$window', 'messenger', 'authenticator', function ($s, $loc, $w, mess, auth) {

        auth.authenticate().then(function (user) {
            mess.threadForUser(user.username).then(function (messages) {
                $s.messages = messages;
            }, log);
        }, log);

    	function imageCssUrl(id) {
    		return id ? 'url(' + mess.imageUrl(id) + ')' : 'none';
    	}

    	$s.messages = [];
    	$s.cssUrl = imageCssUrl;
    	$s.inquire = function () {
    		$loc.path('/inquire');
    	};
    	$s.openImage = function (image) {
    		window.open(mess.imageUrl(image.id));
    	};

    }]);

}).call(this, this.angular);