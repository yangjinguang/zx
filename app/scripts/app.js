'use strict';

/**
 * @ngdoc overview
 * @name zxApp
 * @description
 * # zxApp
 *
 * Main module of the application.
 */
angular
    .module('zxApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'mgcrea.ngStrap',
        'ngSanitize',
        'ngTouch'
    ])
    .run(function ($rootScope) {

    })
    .factory('httpInterceptor', function ($q, $location, $rootScope) {
        var interceptor = {
            request: function (config) {
                return config;
            },
            responseError: function (res) {
                if (res.status == 401) {
                    if ($location.path() != '/login') {
                        $location.path('/login');
                    }
                }
                return res;
            }
        };
        return interceptor;
    })
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
        var token = localStorage.token;
        if (token) {
            $httpProvider.defaults.headers.common['authorization'] = token;
        }
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
    });

