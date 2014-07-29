(function (angular, _, ds, $) {
	'use strict';

    var log = this.console.log,
        sex = {
            male: 'M',
            female: 'F'
        },
        problemTimespan = {
            today: 0,
            yesterday: 1,
            fewDays: 2,
            fewWeeks: 3,
            month: 4
        },
        redEyeLevel = {
            none: 0,
            few: 1,
            stain: 2,
            full: 3
        },
        tearLevel = {
            none: 0,
            allTheTime: 1,
            whenLit: 2,
            occasionally: 3
        },
        secretionLevel = {
            none: 0,
            full: 1,
            allDay: 2,
            occasionally: 3
        },
        hurtLevel = {
            none: 0,
            point: 1,
            full: 2
        },
        pinSensation = {
            none: 0,
            asTension: 1,
            foreignBody: 2,
            burn: 3
        },
        continuousSensation = {
            none: 0,
            blink: 1,
            occasionally: 2,
            movement: 3
        },
        sightChange = {
            none: 0,
            low: 1,
            dim: 2,
            double: 3,
            unclear: 4
        };

	function Questionnaire() {

	    this.age = 30;
	    this.sex = sex.female;
	    this.timespan = problemTimespan.today;
	    this.wasHit = false;
	    this.wasPierced = false;
	    this.injuryCausedBy = null;
	    this.redEye = redEyeLevel.none;
	    this.tears = tearLevel.none;
	    this.secretion = secretionLevel.none;
	    this.hurt = hurtLevel.none;
	    this.pinSensation = pinSensation.none;
	    this.continuousSensation = continuousSensation.none;
	    this.sightChange = sightChange.none;
	    this.eyeLidsInflamed = false;
	    this.isLightBothering = false;
	    this.otherDetails = null;

	}

	angular.module('eye-view-patient')
    .controller('sendInquiryCtrl', ['$scope', '$timeout', '$q', '$location', '$routeParams', 'messenger', 'Message', 'authenticator', 'ImageInfo', 'jsParams', function ($s, $t, $q, $l, $p, mess, Message, auth, ImageInfo, params) {

        var message = null;

        auth.authenticate().then(function (user) {
        	$s.message = message = new Message(params.get('replyingTo'), user.username, params.get('subject'))
				.set('writerName', user.name);
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
					$l.path('/');
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
    		$l.path('/');
    	};
    }]);

}).call(this, this.angular, this._, this.H.DataStore, this.$);