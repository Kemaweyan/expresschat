'use strict';

angular
  .module('core')
  .service('User', ['$rootScope', '$timeout', '$http',
    function ($rootScope, $timeout, $http) {
        var self = this;

        function setAvatar(avatar) {
            self.smallAvatar = "/images/avatars/32/" + avatar;
            self.mediumAvatar = "/images/avatars/48/" + avatar;
            self.largeAvatar = "/images/avatars/100/" + avatar;
        }

        function setAvatarAsync(avatar) {
            $http.get("/images/avatars/32/" + avatar).then(
                function (resp) {
                    setAvatar(avatar);
                },
                function (resp) {
                    if (resp.status == 401) {
                        return;
                    }

                    $timeout(function () {
                        setAvatarAsync(avatar);
                    }, 1000);
                }
            );            
        }
        
        var promise = new Promise(function (resolve, reject) {
            self.setUser = function(data) {
                $rootScope.authorized = true;
                self.id = data.id
                self.username = data.username;
                self.firstName = data.firstname;
                self.lastName = data.lastname;
                self.email = data.email;
                if (data.avatar) {
                    setAvatarAsync(data.avatar);
                } else {
                    self.smallAvatar = "/images/32/no-avatar.png";
                    self.mediumAvatar = "/images/48/no-avatar.png";
                    self.largeAvatar = "/images/100/no-avatar.png";
                }
                resolve();
            };
        });

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

        self.ready = function () {
            return promise;
        };

        self.resetUser();
    }
]);
