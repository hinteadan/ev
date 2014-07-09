(function (angular, _, ds, $) {
    'use strict';

    var log = this.console.log;

    angular.module('eye-view-medic')
    .controller('respondCtrl', ['$scope', '$timeout', '$q', '$location', '$routeParams', 'messenger', 'Message', 'authenticator', 'ImageInfo', function ($s, $t, $q, $l, $p, mess, Message, auth, ImageInfo) {

        var message = null;

        auth.authenticate().then(function (user) {
            $s.message = message = new Message($p.replyingTo, user.username, null, $p.pid);
        }, log);

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
                .success(function (data, status, headers, config) {
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

        function submitMessage() {
            $s.submit.ting = true;

            message.markSent();

            mess.send(message)
				.then(function (entity) {
				    //jshint unused:false
				    $l.path('/thread/' + $p.pid);
				}, function (errReason) {
				    log(errReason);
				})
				.finally(function () { delete $s.submit.ting; });
        }

        $s.onFileSelect = function ($files) {
            $s.uploading = true;
            uploadFiles($files).then(function (r) {
                delete $s.uploading;
                mapUploadResultToMessageImages(r);
            }, function (r) {
                delete $s.uploading;
                mapUploadResultToMessageImages(r);
            });
        };
        $s.message = message;
        $s.selectImagesToUpload = function () {
            $('#fileUpload').click();
        };
        $s.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            if (!$s.submit.confirm) {
                $s.submit.confirm = true;
                $t(function () {
                    delete $s.submit.confirm;
                }, 5000);
                return;
            }

            delete $s.submit.confirm;

            submitMessage();
        };
        $s.cancel = function () {
        	$l.path('/thread/' + $p.pid);
        };
    }]);

}).call(this, this.angular, this._, this.H.DataStore, this.$);