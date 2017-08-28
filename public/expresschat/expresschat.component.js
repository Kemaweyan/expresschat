'use strict';

angular
  .module('expressChat')
  .component('expressChat', {
    templateUrl: "expresschat/expresschat.template.html",
    controller: ['$rootScope', 'Auth',
        function ($rootScope, Auth) {
            var self = this;
            self.authorized = false;

            Auth.login().then(
                function (resp) {
                    self.authorized = true;
                },
                function (resp) {
                    self.authorized = false;
                }
            );
        }
    ]
});
