'use strict';

angular.module('zxApp')
    .directive('tmplmsg', function (MSG_TYPE) {
        return {
            restrict: 'E',
            templateUrl: 'components/tmplmsg/tmplmsg.html',
            require: 'ngModel',
            scope: {
                msgData: '=ngModel',
                type: '=type'
            },
            link: function (scope, element, attr, ngModelController) {
                ngModelController.$viewChangeListeners.push(function () {
                    scope.$eval(attr.ngChange);
                });
                var data = scope.data = {};
                data.MSG_TYPE = MSG_TYPE;
                scope.$watch('type', function (newValue, oldValue) {
                    if (angular.isDefined(data.MSG_TYPE[newValue])) {
                        data.template = 'components/tmplmsg/tpls/' + data.MSG_TYPE[newValue].tpl;
                        data.msgData = angular.copy(data.MSG_TYPE[newValue].baseData);
                    } else {
                        data.template = 'components/tmplmsg/tpls/empty.html';
                        data.msgData = {}
                    }
                });
                var fn = scope.fn = {
                    submit: function () {
                        ngModelController.$setViewValue(data.msgData);
                        scope.$emit('sendMsg', data.msgData);
                    }
                }
            }
        }
    });