'use strict';

angular
  .module('core')
  .service('Backend', ['$http', '$location', '$q', 'User',
    function ($http, $location, $q, User) {
        var self = this;

        self.getAuthInfo = function () {
            return sendRequest('GET', '/login');
        };

        self.postLoginData = function (login, password) {
            return sendRequest('POST', '/login', {login: login, password: password});
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
