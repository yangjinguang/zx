"use strict";

angular.module('zxApp')
    .factory('TmplmsgApi', function ($resource, CONFIG) {
        return $resource(CONFIG.API.url + '/tmplmsg', {}, {
            post: {
                method: 'POST'
            }
        })
    });