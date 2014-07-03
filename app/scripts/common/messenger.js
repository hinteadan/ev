(function (angular) {
    'use strict';

    angular.module('eye-view-common')
    .service('messenger', ['$upload', 'dataStore', function ($upload, ds) {
        
        this.uploadImage = function (file, data) {
            return $upload.upload({
                url: ds.blob.UploadUrl(),
                data: data,
                file: file
            });
        };

    }]);

}).call(this, this.angular);