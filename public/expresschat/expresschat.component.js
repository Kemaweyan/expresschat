'use strict';

angular
  .module('expressChat')
  .component('expressChat', {
    templateUrl: "expresschat/expresschat.template.html",
    controller: ['Auth',
        function (Auth) {
            Auth.login();
        }
    ]
});
