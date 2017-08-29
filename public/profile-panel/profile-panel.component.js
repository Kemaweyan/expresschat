'use strict';

angular
  .module('profilePanel')
  .component('profilePanel', {
    templateUrl: 'profile-panel/profile-panel.template.html',
    controller: ['$location', 'Auth',
        function ($location, Auth) {
            var self = this;

            self.logout = function () {
                Auth.logout().then(function (resp) {
                    $location.path('/login');
                });
            };
        }
    ]
});
