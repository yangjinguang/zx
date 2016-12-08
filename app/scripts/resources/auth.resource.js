"use strict"

angular.module('zxApp')
    .factory('AuthApi', function ($resource, CONFIG) {
        return $resource(CONFIG.API.url + '/login', {}, {
            login: {
                method: 'POST',
            }
        })
    });