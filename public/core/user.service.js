'use strict';

angular
  .module('core')
  .service('User', ['$rootScope',
    function ($rootScope) {
        var self = this;
        
        self.setUser = function(data) {
            $rootScope.authorized = true;
            self.id = data.id
            self.username = data.username;
            self.firstName = data.firstname;
            self.lastName = data.lastname;
            self.email = data.email;
            self.avatar = data.avatar;
        };

        self.resetUser = function () {
            $rootScope.authorized = false;
            self.id = null;
            self.username = null;
            self.firstName = null;
            self.lastName = null;
            self.email = null;
            self.avatar = null;
        };

        self.resetUser();
    }
]);
