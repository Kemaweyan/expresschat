'use strict';

angular
  .module('core')
  .service('User', function () {
    var self = this;
    
    self.setUser = function(data) {
        self.id = data.id
        self.login = data.login;
        self.firstName = data.firstname;
        self.lastName = data.lastname;
        self.email = data.email;
        self.avatar = data.avatar;
    };

    self.resetUser = function () {
        self.id = null;
        self.login = null;
        self.firstName = null;
        self.lastName = null;
        self.email = null;
        self.avatar = null;
    };

    self.resetUser();
});
