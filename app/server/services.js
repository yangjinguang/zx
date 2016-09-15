var token = require("./token");
var qs = require("querystring");
var request = require("request");
var service = {
    getUsers: function (next) {
        "use strict";
        token.check(function (access_token) {
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
        token.check(function (access_token) {
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
                console.log(err);
                if (resData) {
                    next(JSON.parse(body))
                } else {
                    next(err)
                }
            });
        });
    },
    getUserInfoAll: function (users, next) {
        token.check(function (access_token) {
            console.log(access_token);
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
            // console.log(options);
            request(options, function (err, resData, body) {
                // console.log(resData);
                if (resData) {
                    next(body)
                } else {
                    next(err)
                }
            });

        })
    },
    sendTmplMsg: function (msgData, next) {
        token.check(function (access_token) {
            "use strict";
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
            // console.log(options);
            request(options, function (err, resData, body) {
                // console.log(resData);
                if (resData) {
                    next(body)
                } else {
                    next(err)
                }
            });
        });
    }
};
module.exports = service;