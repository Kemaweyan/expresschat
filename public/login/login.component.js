'use strict';

angular
  .module('login')
  .component('login', {
    templateUrl: "login/login.template.html",
    controller: ['$rootScope', '$location', 'Backend',
        function ($rootScope, $location, Backend) {
            var self = this;

            if ($rootScope.userId) {
                $location.path('/');
            }

            self.submit = function () {
                Backend.postLoginData(self.login, self.password).then(function (data) {
                    $rootScope.userId = data.id;
                    $rootScope.userLogin = data.login;
                    $rootScope.userFirstName = data.firstname;
                    $rootScope.userLastName = data.lastname;
                    $location.path('/');
                }, function (resp) {
                    self.error = resp.data.error;
                    self.password = "";
                });
            };
        }
    ]
});
