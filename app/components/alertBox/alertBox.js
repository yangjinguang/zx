angular.module('zxApp')
    .service('alertBox', function ($alert) {
        "use strict";
        var opts = {
            placement: 'top',
            animation: 'am-fade-and-slide-top',
            container: 'body',
            duration: 2,
            show: true
        };
        this.success = function (msg) {
            $alert(angular.extend({
                title: msg,
                type: 'success'
            }, opts))
        };
        this.info = function (msg) {
            $alert(angular.extend({
                title: msg,
                type: 'info'
            }, opts))
        };
        this.error = function (msg) {
            $alert(angular.extend({
                title: msg,
                type: 'danger'
            }, opts))
        }
    });