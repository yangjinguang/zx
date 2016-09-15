'use strict';

angular.module('zxApp')
    .service('confirmBox', function ($modal, $q) {
        return function (opts) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            opts = angular.extend({
                msg: '确定吗?',
                okText: '确定',
                cancelText: '取消'
            }, opts);
            var modal = $modal({
                content: opts.msg,
                placement: 'center',
                templateUrl: 'components/confirmBox/confirmBox.html',
                show: true
            });
            modal.$scope.opts = opts;
            modal.$scope.ok = function () {
                deferred.resolve()
            };
            modal.$scope.cancel = function () {
                deferred.reject()
            };
            return promise;
        }
    });