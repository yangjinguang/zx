"use strict";

angular.module('zxApp')
    .factory('TmplmsgApi', function ($resource) {
        return $resource('http://127.0.0.1:6543/tmplmsg', {}, {
            post: {
                method: 'POST'
            }
        })
    });