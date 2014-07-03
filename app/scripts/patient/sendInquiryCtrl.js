(function (angular, _, ds) {
    'use strict';

    var log = this.console.log;

    function ImageInfo(id, url, details) {
        var self = this;
        this.id = id || null;
        this.url = url || null;
        this.details = details || null;
        this.isValid = true;
        this.cssUrl = function () {
            return 'url(' + self.url + ')';
        };
        this.markInvalid = function () {
            self.isValid = false;
            return self;
        };
    }
    ImageInfo.uploadError = new ImageInfo(null, null, 'Error uploading this image').markInvalid();

    angular.module('eye-view-patient')
    .controller('sendInquiryCtrl', ['$scope', '$q', 'messenger', function ($s, $q, mess) {

        function uploadFiles(files) {
            var uploadTasks = [];

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

        function mapUploadResultToScopeImages(result) {
            /// <param name='result' type='Array' elementType='ds.OperationResult' />
            _.each(result, function (r) {
                if (!r || !r.isSuccess) {
                    $s.images.push(ImageInfo.uploadError);
                    return;
                }
                $s.images.push(new ImageInfo(r.data[0].Id, mess.imageUrl(r.data[0].Id)));
            });
            log($s.images);
        }

        $s.onFileSelect = function ($files) {
            uploadFiles($files).then(mapUploadResultToScopeImages, mapUploadResultToScopeImages);
        };
        $s.images = [];
    }]);

}).call(this, this.angular, this._, this.H.DataStore);