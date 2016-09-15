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
    .config(function ($stateProvider, $urlRouterProvider,$httpProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
    });

