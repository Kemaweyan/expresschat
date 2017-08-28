'use strict';

angular
  .module('core')
  .service('Auth', ['Backend', 'User', '$q',
    function (Backend, User, $q) {
        var self = this;

        self.login = function () {
            return Backend.getAuthInfo().then(
                function (resp) {
                    User.setUser(resp.data);
                    return resp;
                },
                function (resp) {
                    User.resetUser();
                    return $q.reject(resp);
                }
            );
        };
    }
]);
