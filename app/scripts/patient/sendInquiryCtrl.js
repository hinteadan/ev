(function (angular, _, ds) {
    'use strict';

    var log = this.console.log;

    angular.module('eye-view-patient')
    .controller('sendInquiryCtrl', ['$scope', '$q', 'messenger', function ($s, $q, mess) {

        function uploadFiles(files) {
            var uploadTasks = [],
                callback = null;

            _.each(files, function (f) {
                
                var deferred = $q.defer();
                uploadTasks.push(deferred.promise);

                mess.uploadImage(f)
                .progress(function (e) {
                    //jshint unused:false
                    log(Math.round(100.0 * e.loaded / e.total) + ' %');
                })
                .success(function(data, status, headers, config) {
                    //jshint unused:false
                    deferred.resolve(new ds.OperationResult(true, null, data));
                })
                .error(function () {
                    deferred.reject(new ds.OperationResult(false, 'Some error occurred while trying to upload the image', null));
                });
            });

            return $q.all(uploadTasks);
        }

        $s.onFileSelect = function ($files) {
            uploadFiles($files).then(log, log);
        };
    }]);

}).call(this, this.angular, this._, this.H.DataStore);