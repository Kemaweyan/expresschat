'use strict';

angular
  .module('login')
  .component('login', {
    templateUrl: "login/login.template.html",
    controller: ['$location', 'Backend', 'User',
        function ($location, Backend, User) {
            var self = this;

            if (User.id) {
                $location.path('/');
            }

            self.submit = function () {
                Backend.postLoginData(self.login, self.password).then(function (resp) {
                    User.setUser(resp.data);
                    $location.path('/');
                }, function (resp) {
                    self.error = resp.data.error;
                    self.password = "";
                });
            };
        }
    ]
});
