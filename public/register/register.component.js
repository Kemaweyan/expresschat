'use strict';

angular
  .module('register')
  .component('register', {
    templateUrl: "register/register.template.html",
    controller: ['$location', 'Backend', 'User',
        function ($location, Backend, User) {
            var self = this;

            if (User.id) {
                $location.path('/');
            }

            self.submit = function () {
                if (self.password != self.confirm) {
                    self.error = "Password confirmation does not match";
                    return;
                }

                var data = {
                    username: self.username,
                    firstname: self.firstname,
                    lastname: self.lastname,
                    password: self.password,
                    email: self.email
                };

                Backend.postRegisterData(data).then(
                    function (resp) {
                        User.setUser(resp.data);
                        $location.path('/');
                    }, function (resp) {
                        self.error = resp.data.error;
                        self.password = "";
                        self.password2 = "";
                    }
                );
            };

            self.cancel = function () {
                $location.path('/login');
            };
        }
    ]
});
