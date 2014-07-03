﻿(function (angular, _, ds) {
    'use strict';

    var log = this.console.log;

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

    function Message(id, previousId, userId, subject) {
        this.id = id || null;
        this.previousId = previousId || null;
        this.userId = userId || null

        this.subject = subject || null;
        this.content = null;
        this.images = [];
    }

    angular.module('eye-view-patient')
    .controller('sendInquiryCtrl', ['$scope', '$q', 'messenger', function ($s, $q, mess) {

        var message = new Message(null, null, 'hinteadan');

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

        function mapUploadResultToMessageImages(result) {
            /// <param name='result' type='Array' elementType='ds.OperationResult' />
            _.each(result, function (r) {
                if (!r || !r.isSuccess) {
                    message.images.push(ImageInfo.uploadError);
                    return;
                }
                message.images.push(new ImageInfo(r.data[0].Id, mess.imageUrl('')));
            });
        }

        $s.onFileSelect = function ($files) {
            uploadFiles($files).then(mapUploadResultToMessageImages, mapUploadResultToMessageImages);
        };
        $s.message = message;
    }]);

}).call(this, this.angular, this._, this.H.DataStore);