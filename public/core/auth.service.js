'use strict';

angular
  .module('core')
  .service('Auth', ['Backend', 'User',
    function (Backend, User) {
        var self = this;

        self.login = function () {
            return Backend.getAuthInfo().then(
                function (resp) {
                    User.setUser(resp.data);
                },
                function (resp) {
                    User.resetUser();
                }
            );
        };
    }
]);
