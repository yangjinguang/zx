angular.module('zxApp')
    .directive('pagination', function () {
        return {
            restrict: 'E',
            templateUrl: './components/pagination/pagination.html',
            scope: {
                totalPages: '=',
                page: '=page',
                pageChange: '&'
            },
            link: function (scope, element, attr, ngModelController) {
                var data = scope.data = {};
                scope.$watch('totalPages+page', function () {
                    "use strict";
                    data.pageList = [];
                    for (var i = scope.page; i >= scope.page - 2; i--) {
                        if (i >= 1) {
                            data.pageList.push(i)
                        } else {
                            break;
                        }
                    }
                    data.pageList.reverse();
                    for (var i = scope.page + 1; i <= scope.totalPages; i++) {
                        if (data.pageList.length < 5) {
                            data.pageList.push(i)
                        } else {
                            break;
                        }
                    }
                });
                var fn = scope.fn = {
                    pageClick: function (p) {
                        scope.pageChange({page: p})
                    },
                    prePage: function () {
                        if (scope.page > 1) {
                            scope.pageChange({page: scope.page - 1})
                        }
                    },
                    nextPage: function () {
                        if (scope.page < scope.totalPages) {
                            scope.pageChange({page: scope.page + 1})
                        }
                    }
                }
            }
        }
    });