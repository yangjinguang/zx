"use strict"

angular.module('zxApp')
    .factory('UsersApi', function ($resource) {
        return $resource('http://127.0.0.1:6543/users', {}, {
            getUsers: {
                method: 'GET',
            },
            getUserInfo: {
                method: 'GET',
                url: 'http://127.0.0.1:6543/user/info/:id'
            }
        })
    });