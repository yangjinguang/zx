'use strict';

/**
 * @ngdoc function
 * @name zxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zxApp
 */
angular.module('zxApp')
    .controller('LoginCtrl', function ($scope, $state, $http, AuthApi) {
        var data = $scope.data = {};
        var userData = $scope.userData = {};
        var fn = $scope.fn = {
            login: function () {
                AuthApi.login(userData, function (res) {
                    localStorage.userId = res.id;
                    localStorage.userName = res.name;
                    localStorage.token = res.token;
                    $http.defaults.headers.common['authorization'] = res.token;
                    $state.go('main')
                }, function (err) {
                    data.err = err.data.data
                })
            }
        }
    });
