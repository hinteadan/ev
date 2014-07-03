(function (angular, _) {
    'use strict';

    angular.module('eye-view-patient')
    .controller('sendInquiryCtrl', ['$scope', '$upload', '$q', 'messenger', function ($s, $upload, $q, mess) {

        function uploadFiles(files) {
            var deferred = $q.defer(),
                callback = null;

            _.each(files, function (f) {
                console.log(f);
                deferred.resolve({});
                //deferred.reject();
            });

            return deferred.promise;
        }

        $s.onFileSelect = function ($files) {
            uploadFiles($files).then(function () { console.log('Uploaded'); });
        };
    }]);

}).call(this, this.angular, this._);