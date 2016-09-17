angular.module('zxApp')
    .filter('headimgFt', function () {
        return function (headimgurl, size) {
            if (headimgurl) {
                var res = headimgurl.split('/');
                res[res.length - 1] = size;
                return res.join('/')
            } else {
                return 'images/yeoman.png'
            }

        }
    });