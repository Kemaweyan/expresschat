'use strict';

angular
  .module('core')
  .service('Backend', ['$http', '$location', '$q', 'User',
    function ($http, $location, $q, User) {
        var self = this;

        self.getAuthInfo = function () {
            return sendRequest('GET', '/login');
        };

        self.postLoginData = function (data) {
            return sendRequest('POST', '/login', data);
        };

        self.postRegisterData = function (data) {
            return sendRequest('POST', '/register', data);
        };

        self.getLogout = function () {
            return sendRequest('GET', '/logout');
        };

        self.getChatList = function () {
            return sendRequest('GET', '/chats');
        };

        self.getChat = function (chatId, skip) {
            var url = '/chats/' + chatId;
            if (skip) {
                url += '/' + skip;
            }
            return sendRequest('GET', url);
        };

        self.getUsers = function (query) {
            return sendRequest('GET', '/search/?q=' + query);
        };

        self.postNewMessage = function (data) {
            return sendRequest('POST', '/chats', data);
        };

        self.postNewChat = function (buddyId) {
            return sendRequest('POST', '/chats', {buddyId: buddyId});
        };

        function sendRequest(method, url, data) {
            return $http({
                method: method,
                url: url,
                data: data
            }).then(
                null,
                function (resp) {
                    if (resp.status == 401) {
                        User.resetUser();
                        $location.path('/login');
                    }
                    return $q.reject(resp);
                }
            );
        }
    }
]);
