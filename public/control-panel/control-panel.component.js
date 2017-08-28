'use strict';

angular
  .module('controlPanel')
  .component('controlPanel', {
    templateUrl: 'control-panel/control-panel.template.html',
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
