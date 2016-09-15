"use strict"

angular.module('zxApp')
    .factory('UsersApi', function ($resource, CONFIG) {
        return $resource(CONFIG.API.url + '/users', {}, {
            getUsers: {
                method: 'GET',
            },
            getUserInfo: {
                method: 'GET',
                url: CONFIG.API.url + '/user/info/:id'
            }
        })
    });