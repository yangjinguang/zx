var express = require('express');
var request = require("request");
var qs = require("querystring");
var token = require('./token');
var service = require("./services");
var bodyParser  = require('body-parser');

var app = express();
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/users', function (req, res) {
    service.getUsers(function (resData) {
        res.send(resData)
    })
});
app.get('/user/info/:id', function (req, res) {
    "use strict";
    var pageCount = 50;
    if (req.params.id == 'all') {
        var users = {
            "user_list": []
        };
        var page = Number(req.query.page) || 1;
        service.getUsers(function (resData) {
            var total = resData.total;
            var offset = (page - 1) * pageCount;
            var openids = resData.data.openid.splice(offset, pageCount);
            openids.forEach(function (openid, index) {
                users.user_list.push({
                    "openid": openid,
                    "lang": "zh-CN"
                })
            });
            service.getUserInfoAll(users, function (resData) {
                resData.total = total;
                resData.page = page;
                resData.count = pageCount;
                resData.maxPage = parseInt(total / pageCount);
                res.send(resData)
            })
        })
    } else {
        service.getUserInfo(req.params.id, function (resData) {
            res.send(resData)
        })
    }

});
app.post('/tmplmsg', function (req, res) {
    console.log(req.body)
    service.sendTmplMsg(req.body, function (resData) {
        res.send(resData)
    })
});


app.listen(6543, function () {
    console.log('Example app listening on port 6543!');
});