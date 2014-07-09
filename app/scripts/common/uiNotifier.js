(function (angular, $notify) {
    'use strict';

    if (!$notify) {
        throw new Error('Notify.js not referenced!');
    }

    function NotifyJsNotifier() {
        this.success = function (message) {
            $notify(message, 'success');
        };
        this.info = function (message) {
            $notify(message, 'info');
        };
        this.warning = function (message) {
            $notify(message, 'warn');
        };
        this.error = function (message) {
            $notify(message, 'error');
        };
    }

    angular.module('eye-view-common')
	.service('uiNotifier', [NotifyJsNotifier]);

}).call(this, this.angular, this.$.notify);