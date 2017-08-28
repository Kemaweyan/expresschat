'use strict';

angular
  .module('login')
  .component('login', {
    templateUrl: "login/login.template.html",
    controller: ['$location', 'Backend', 'Auth',
        function ($location, Backend, Auth) {
            var self = this;

            if (Auth.userId) {
                $location.path('/');
            }

            self.submit = function () {
                Backend.postLoginData(self.login, self.password).then(function (resp) {
                    Auth.setUser(resp.data);
                    $location.path('/');
                }, function (resp) {
                    self.error = resp.data.error;
                    self.password = "";
                });
            };
        }
    ]
});
