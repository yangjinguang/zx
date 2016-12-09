'use strict';

angular.module('zxApp')
    .directive('loadMore', function () {
        return {
            restrict: 'E',
            templateUrl: './components/loadMore/loadMore.html',
            scope: {},
            link: function (scope, element, attrs, ngModelController) {

            }
        }
    });