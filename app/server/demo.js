var token = require('./token');
var request = require("request");

token.check(function (access_token) {
    "use strict";
    var postData = {
        "touser": "xxxxxx",
        "template_id": "xxxxx",
        "url": "http://weixin.qq.com/download",
        "data": {
            "first": {
                "value": "您好！",
                "color": "#173177"
            },
            "keyword1": {
                "value": "数学",
                "color": "#173177"
            },
            "keyword2": {
                "value": "2016年10月8日",
                "color": "#173177"
            },
            "keyword3": {
                "value": "北京",
                "color": "#173177"
            },
            "keyword4": {
                "value": "12345678901",
                "color": "#173177"
            },
            "remark": {
                "value": "欢迎报名!",
                "color": "#173177"
            }
        }
    };
    var url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token;
    var options = {
        method: 'POST',
        url: url,
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: postData

    };
    // console.log(options);
    request(options, function (err, resData, body) {
        // console.log(resData);
        if (resData) {
            console.log(body)
        } else {
            console.log(err)
        }
    });
});

