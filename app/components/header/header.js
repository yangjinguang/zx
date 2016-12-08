'use strict';

angular.module('zxApp')
    .directive('header', function ($state) {
        return {
            restrict: 'E',
            templateUrl: './components/header/header.html',
            scope: {},
            link: function (scope, element, attrs, ngModelController) {
                scope.state = $state;
                var data = scope.data = {};
                data.userName = localStorage.userName;
                var fn = scope.fn = {
                    logout: function () {
                        localStorage.clear();
                        $state.go('login')
                    }
                }
            }
        }
    });