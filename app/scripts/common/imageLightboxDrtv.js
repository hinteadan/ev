(function (angular, $) {

	'use strict';

	angular.module('eye-view-common').directive('imagelightbox', [function () {
		return {
			restrict: 'A',
			replace: false,
			transclude: false,
			link: function (scope, $el) {
				//jshint unused:false
				$el.find('.swipebox').swipebox();
			}
		};

	}]);

}).call(this, this.angular, this.jQuery);