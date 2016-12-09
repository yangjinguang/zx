var service = require("./services");
var async = require('async');
var redis = require('redis');
var config = require('./config');
var redisClient = redis.createClient({"host": config.redis.host, "port": config.redis.port});

function getUserInfo(offset, allOpenid, next) {
    var openids = allOpenid.slice(offset, offset + 100);
    var users = {
        'user_list': []
    };
    openids.forEach(function (openid) {
        users.user_list.push({
            "openid": openid,
            "lang": "zh-CN"
        })
    });
    service.getUserInfoAll(users, function (resData) {
        console.log('from wx')
        next(resData)
    });
}
function userToLocal(next) {
    service.getUsers(function (resData) {
        var offset = 0;
        var offsetList = [];
        var count = resData.data.openid.length;
        var userInfoList = [];
        while (offset < count) {
            offsetList.push(offset);
            offset += 100
        }
        async.eachSeries(offsetList, function (offset, callback) {
            getUserInfo(offset, resData.data.openid, function (resData) {
                userInfoList = userInfoList.concat(resData['user_info_list']);
                callback()
            })
        }, function () {
            console.log(userInfoList.length);
            redisClient.set('userInfoList', JSON.stringify(userInfoList));
            next(userInfoList)
        })
    });
}
var localUser = {
    get: function (next, force) {
        if (force) {
            userToLocal(function (resData) {
                next(resData)
            })
        } else {
            redisClient.get('userInfoList', function (err, reply) {
                if (reply) {
                    next(JSON.parse(reply))
                } else {
                    userToLocal(function (resData) {
                        next(resData)
                    })
                }
            });
        }
    }
};

module.exports = localUser;