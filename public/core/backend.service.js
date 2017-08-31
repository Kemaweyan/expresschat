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

        self.getUserInfo = function (userId) {
            return sendRequest('GET', '/users/' + userId);
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
