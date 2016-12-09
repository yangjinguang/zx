var wxToken = require("./wxToken");
var qs = require("querystring");
var request = require("request");
var jwt = require('jwt-simple');
var md5 = require('md5');
var secret = 'SuperIXX';
var md5Salt = 'IIOnd';
var config = require('./config');
var service = {
    login: function (userData, next) {
        var users = config.users;
        var res = null;
        users.forEach(function (user) {
            if (user.username == userData.username && md5(userData.password + md5Salt) == user.password) {
                res = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    token: jwt.encode(user, secret)
                }
            }
        });
        if (res) {
            next(null, res)
        } else {
            next({msg: '用户名密码错误'})
        }
    },
    auth: function (token, next) {
        var isPass = false;
        try {
            var userData = jwt.decode(token, secret);
            config.users.forEach(function (user) {
                if (user.id == userData.id) {
                    isPass = true;
                }
            });
        } catch (e) {

        }

        if (isPass) {
            next()
        } else {
            next({msg: '认证失败'})
        }
    },
    getUsers: function (next) {
        "use strict";
        wxToken.check(function (access_token) {
            var queryParams = {
                'access_token': access_token
            };
            var url = 'https://api.weixin.qq.com/cgi-bin/user/get?' + qs.stringify(queryParams);
            var options = {
                method: 'GET',
                url: url
            };
            request(options, function (err, resData, body) {
                if (resData) {
                    next(JSON.parse(body))
                } else {
                    next(err)
                }
            });
        })
    },
    getUserInfo: function (id, next) {
        wxToken.check(function (access_token) {
            var queryParams = {
                'access_token': access_token,
                'openid': id,
                'lang': 'zh_CN'
            };
            var url = 'https://api.weixin.qq.com/cgi-bin/user/info?' + qs.stringify(queryParams);
            var options = {
                method: 'GET',
                url: url
            };
            request(options, function (err, resData, body) {
                if (resData) {
                    next(JSON.parse(body))
                } else {
                    next(err)
                }
            });
        });
    },
    getUserInfoAll: function (users, next) {
        wxToken.check(function (access_token) {
            var url = 'https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=' + access_token;
            var options = {
                method: 'POST',
                url: url,
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: users

            };
            request(options, function (err, resData, body) {
                if (resData) {
                    next(body)
                } else {
                    next(err)
                }
            });

        })

    },
    sendTmplMsg: function (msgData, next) {
        "use strict";
        wxToken.check(function (access_token) {
            var url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token;
            var options = {
                method: 'POST',
                url: url,
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: msgData

            };
            request(options, function (err, resData, body) {
                if (resData) {
                    next(body)
                } else {
                    next(err)
                }
            });
        })
    }
};
module.exports = service;