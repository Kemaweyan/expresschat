'use strict';

angular
  .module('expressChat')
  .component('expressChat', {
    templateUrl: "expresschat/expresschat.template.html",
    controller: ['$rootScope', 'Backend',
        function ($rootScope, Backend) {
            var self = this;

            Backend.getAuthInfo().then(function (data) {
                $rootScope.userId = data.id
                $rootScope.userLogin = data.login;
                $rootScope.userFirstName = data.firstname;
                $rootScope.userLastName = data.lastname;
            }, function (resp) {
                $rootScope.userId = null;
            });
        }
    ]
});
