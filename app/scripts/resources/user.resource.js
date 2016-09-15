"use strict"

angular.module('zxApp')
    .factory('UsersApi', function ($resource) {
        return $resource('http://123.57.45.81:6543/users', {}, {
            getUsers: {
                method: 'GET',
            },
            getUserInfo: {
                method: 'GET',
                url: 'http://123.57.45.81:6543/user/info/:id'
            }
        })
    });