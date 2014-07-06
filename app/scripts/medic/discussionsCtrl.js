(function (angular) {
	'use strict';

	angular.module('eye-view-medic')
    .controller('disussionsList', ['$scope', 'messenger', function ($s, mess) {

    	$s.patients = [];

    	mess.patients().then(function (ps) {
    		$s.patients = ps;
    	}, function () { });
    }]);

}).call(this, this.angular);