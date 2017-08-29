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
