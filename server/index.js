var express = require('express');
var request = require("request");
var qs = require("querystring");
var wxToken = require('./wxToken');
var service = require("./services");
var bodyParser = require('body-parser');
var localUser = require('./localUser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method != 'OPTIONS' && req.url != '/login') {
        service.auth(req.headers['authorization'], function (err) {
            if (err) {
                res.status(401);
                res.send(err)
            } else {
                next()
            }
        })
    } else {
        next()
    }
});
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.post('/login', function (req, res) {
    var userData = req.body;
    service.login(userData, function (err, resData) {
        if (err) {
            res.status(401);
            res.send({data: err.msg})
        } else {
            res.send(resData)
        }
    })
})
app.get('/users', function (req, res) {
    service.getUsers(function (resData) {
        res.send(resData)
    })
});
app.get('/user/info/:id', function (req, res) {
    "use strict";
    if (req.params.id == 'all') {
        var users = {
            "user_list": []
        };
        var page = Number(req.query.page) || 1;
        var pageCount = 50;
        var offset = (page - 1) * pageCount;
        var allUsers = {};
        var search = req.query.q;
        console.log(req.query);
        var force = req.query.force === 'true';
        localUser.get(function (resData) {
            var filterUserList = [];
            if (search) {
                console.log(search);
                var reg = new RegExp(search);
                resData.forEach(function (user) {
                    if (reg.test(user.nickname)) {
                        filterUserList.push(user)
                    }
                });
            } else {
                filterUserList = resData;
            }
            allUsers.list = filterUserList.slice(offset, offset + pageCount);
            allUsers.total = filterUserList.length;
            allUsers.page = page;
            allUsers.count = pageCount;
            if (allUsers.total % allUsers.count > 0) {
                allUsers.maxPage = parseInt(allUsers.total / allUsers.count) + 1;
            } else {
                allUsers.maxPage = parseInt(allUsers.total / allUsers.count)
            }
            res.send(allUsers)
        }, force);

    } else {
        service.getUserInfo(req.params.id, function (resData) {
            res.send(resData)
        })
    }

});
app.post('/tmplmsg', function (req, res) {
    "use strict";
    service.sendTmplMsg(req.body, function (resData) {
        res.send(resData)
    })
});


app.listen(6543, function () {
    console.log('Example app listening on port 6543!');
});