'use strict';

angular
  .module('core')
  .service('Auth', ['Backend', '$q',
    function (Backend, $q) {
        var self = this;

        self.login = function () {
            return Backend.getAuthInfo().then(
                function (resp) {
                    self.setUser(resp.data);
                    return resp;
                },
                function (resp) {
                    self.resetUser();
                    return $q.reject(resp);
                }
            );
        };

        self.setUser = function(data) {
            self.userId = data.id
            self.userLogin = data.login;
            self.userFirstName = data.firstname;
            self.userLastName = data.lastname;
            self.userEmail = data.email;
            self.userAvatar = data.avatar;
        };

        self.resetUser = function () {
            self.userId = null;
            self.userLogin = null;
            self.userFirstName = null;
            self.userLastName = null;
            self.userEmail = null;
            self.userAvatar = null;
        };

        self.resetUser();
    }
]);
