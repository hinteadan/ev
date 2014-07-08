(function (angular) {
    'use strict';

    var log = this.console.log;

    angular.module('eye-view-medic')
    .controller('threadCtrl', ['$scope', '$location', '$window', '$routeParams', 'messenger', function ($s, $loc, $w, $rp, mess) {

        mess.threadForUser($rp.pid).then(function (messages) {
            $s.messages = messages;
        }, log);

        function imageCssUrl(id) {
            return id ? 'url(' + mess.imageUrl(id) + ')' : 'none';
        }

        $s.messages = [];
        $s.cssUrl = imageCssUrl;
        $s.respond = function () {
            $loc.path('/respond/' + $rp.pid);
        };
        $s.openImage = function (image) {
            window.open(mess.imageUrl(image.id));
        };
        $s.viewDiscussions = function () {
            $loc.path('/');
        };
    }]);

}).call(this, this.angular);