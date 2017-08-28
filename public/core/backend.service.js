'use strict';

angular
  .module('core')
  .service('Backend', ['$http', '$location', '$q',
    function ($http, $location, $q) {
        var self = this;

        self.getAuthInfo = function () {
            return sendRequest('GET', '/login');
        };

        self.postLoginData = function (login, password) {
            return sendRequest('POST', '/login', {login: login, password: password});
        };

        function sendRequest(method, url, data) {
            return $q(function (resolve, reject) {
                $http({
                    method: method,
                    url: url,
                    data: data
                }).then(function (resp) {
                    resolve(resp.data);
                }, function (resp) {
                    if (resp.status == 401) {
                        $location.path('/login');
                    }
                    reject(resp);
                });
            });
        }
    }
]);
