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
            if (data.avatar) {
                self.smallAvatar = "/images/avatars/32/" + data.avatar;
                self.mediumAvatar = "/images/avatars/48/" + data.avatar;
                self.largeAvatar = "/images/avatars/100/" + data.avatar;
            } else {
                self.smallAvatar = "/images/32/no-avatar.png";
                self.mediumAvatar = "/images/48/no-avatar.png";
                self.largeAvatar = "/images/100/no-avatar.png";
            }
        };

        self.resetUser = function () {
            $rootScope.authorized = false;
            self.id = null;
            self.username = null;
            self.firstName = null;
            self.lastName = null;
            self.email = null;
            self.smallAvatar = null;
            self.mediumAvatar = null;
            self.largeAvatar = null;
        };

        self.resetUser();
    }
]);
