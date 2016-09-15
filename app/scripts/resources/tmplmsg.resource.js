"use strict";

angular.module('zxApp')
    .factory('TmplmsgApi', function ($resource) {
        return $resource('http://123.57.45.81:6543/tmplmsg', {}, {
            post: {
                method: 'POST'
            }
        })
    });