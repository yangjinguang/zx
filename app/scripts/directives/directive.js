angular.module('zxApp')
    .directive('ngKeyenter', function () {
        /**
         * 绑定回车事件
         */
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngKeyenter, {'event': event});
                    });
                    event.preventDefault();
                }
            });
        };
    })