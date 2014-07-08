(function (angular) {
	'use strict';

	var log = this.console.log;

	angular.module('eye-view-medic')
    .controller('disussionsList', ['$scope', '$location', 'messenger', function ($s, $l, mess) {

    	$s.patients = [];

    	$s.viewDiscussionWith = function (patient) {
    	    $l.path('/thread/' + patient.username);
    	};

    	mess.patients().then(function (ps) {
    		$s.patients = ps;
    	}, log);
    }]);

}).call(this, this.angular);