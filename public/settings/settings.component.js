'use strict';

angular
  .module('settings')
  .component('settings', {
    templateUrl: "settings/settings.template.html",
    controller: ['Backend', 'User', '$scope',
        function (Backend, User, $scope) {
            var self = this;
            self.user = User;

            User.ready().then(function () {
                $scope.$apply(function () {
                    self.firstname = User.firstName;
                    self.lastname = User.lastName;
                    self.email = User.email;
                });
            });

            self.submit = function () {
                if (self.newpassword != self.confirm) {
                    self.error = "Password confirmation does not match";
                    return;
                }

                var data = {
                    avatar: self.avatar,
                    firstname: self.firstname,
                    lastname: self.lastname,
                    email: self.email,
                    password: self.password,
                    newpassword: self.newpassword
                };

                Backend.postSettings(data).then(
                    function (resp) {
                        User.setUser(resp.data);
                    },
                    function (resp) {
                        self.error = resp.data.error;
                    }
                );
            };
        }
    ]
});
