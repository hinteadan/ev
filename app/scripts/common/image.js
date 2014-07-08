(function (angular) {
    'use strict';

    function ImageInfo(id, urlBase, details) {
        var self = this;
        this.id = id || null;
        this.url = function () {
            return !urlBase ? null : urlBase + id;
        };
        this.details = details || null;
        this.isValid = true;
        this.cssUrl = function () {
            return self.url() ? 'url(' + self.url() + ')' : 'none';
        };
        this.markInvalid = function () {
            self.isValid = false;
            return self;
        };
    }
    ImageInfo.uploadError = new ImageInfo(null, null, 'Error uploading this image').markInvalid();

    angular.module('eye-view-common').value('ImageInfo', ImageInfo);


}).call(this, this.angular);