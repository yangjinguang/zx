'use strict';

angular.module('zxApp')
    .directive('header', function () {
        return {
            restrict: 'E',
            templateUrl: './components/header/header.html',
            scope: {},
            link: function ($scope, element, attrs, ngModelController) {

            }
        }
    });