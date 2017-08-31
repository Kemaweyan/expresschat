'use strict';

angular
  .module('profilePanel')
  .component('profilePanel', {
    templateUrl: 'profile-panel/profile-panel.template.html',
    controller: ['$location', 'Auth', 'User',
        function ($location, Auth, User) {
            var self = this;
            self.user = User;

            self.logout = function () {
                Auth.logout().then(function (resp) {
                    $location.path('/login');
                });
            };
        }
    ]
});
