'use strict';

angular
  .module('profilePanel')
  .component('profilePanel', {
    templateUrl: 'profile-panel/profile-panel.template.html',
    controller: ['$location', 'Auth', 'User',
        function ($location, Auth, User) {
            var self = this;

            self.userName = User.firstName + " " + User.lastName;
            self.avatar = User.avatar ? "/images/avatars/100/" + User.avatar : "/images/100/no-avatar.png";

            self.logout = function () {
                Auth.logout().then(function (resp) {
                    $location.path('/login');
                });
            };
        }
    ]
});
