'use strict';

/**
 * @ngdoc function
 * @name zxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zxApp
 */
angular.module('zxApp')
    .controller('MainCtrl', function ($scope, $alert, UsersApi, TmplmsgApi, MSG_TYPE, alertBox) {
        var data = $scope.data = {};
        data.selectUser = null;
        data.MSG_TYPE = MSG_TYPE;
        data.thisMsgType = data.MSG_TYPE['KCKT'];
        function refreshUserList(opts) {
            opts = angular.extend({
                id: 'all',
                page: 1
            }, opts);
            UsersApi.getUserInfo(opts, function (res) {
                data.userList = res.user_info_list;
                data.pageData = {
                    totalPages: res.maxPage,
                    page: res.page
                };
                data.selectUser = null;
            });
        }

        refreshUserList();
        function sendTmplMsg(msgData) {
            if (!data.selectUser) {
                alertBox.error('请先选择用户');
                return;
            }
            msgData.touser = data.selectUser.openid;


            TmplmsgApi.post({}, msgData, function (res) {
                alertBox.success('发送成功');
            }, function (res) {
                alertBox.error('发送失败');
            })
        }

        $scope.$on('sendMsg', function (event, msgData) {
            sendTmplMsg(msgData)
        });
        var fn = $scope.fn = {
            msgTypeChange: function (type) {
                data.thisMsgType = type;
            },
            pageChange: function (page) {
                refreshUserList({
                    page: page
                })
            }
        }
    });
