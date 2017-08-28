'use strict';

angular
  .module('navigationPanel')
  .component('navigationPanel', {
    templateUrl: 'navigation-panel/navigation-panel.template.html',
    controller: ['$routeParams', '$location', 'Auth',
        function ($routeParams, $location, Auth) {
            this.logout = function () {
                Auth.logout().then(function (resp) {
                    $location.path('/login');
                });
            };
        }
    ]
});
