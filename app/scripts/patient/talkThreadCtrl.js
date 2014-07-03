(function (angular) {
	'use strict';

	var log = this.console.log;

	angular.module('eye-view-patient')
    .controller('talkThreadCtrl', ['$scope', '$location', '$window', 'messenger', function ($s, $loc, $w, mess) {

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

    	mess.threadForUser('hinteadan').then(function (messages) {
    		$s.messages = messages;
    	}, log);

    }]);

}).call(this, this.angular);