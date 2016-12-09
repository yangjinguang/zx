var redis = require('redis');
var qs = require("querystring");
var request = require("request");
var config = require('./config');

// redisClient.set('foo','bar');
// redisClient.expire('foo',10);
var redisClient = redis.createClient({"host": config.redis.host, "port": config.redis.port});

var wxToken = {
    get: function (next) {
        "use strict";
        let queryParams = {
            grant_type: config.wxAuth.grant_type,
            appid: config.wxAuth.appid,
            secret: config.wxAuth.secret
        };

        let wxGetAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-bin/token?' + qs.stringify(queryParams);
        let options = {
            method: 'GET',
            url: wxGetAccessTokenBaseUrl
        };
        request(options, function (err, resData, body) {
            if (resData) {
                next(JSON.parse(body));
            } else {
                next(err);
            }
        });
    },
    check: function (next) {
        redisClient.get('access_token', function (err, reply) {
            if (reply) {
                // console.log('from cache');
                next(reply)
            } else {
                wxToken.get(function (resData) {
                    "use strict";
                    redisClient.set('access_token', resData.access_token);
                    redisClient.expire('access_token', resData.expires_in);
                    next(resData.access_token)
                })
            }
        });
    }
};
module.exports = wxToken;
