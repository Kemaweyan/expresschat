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
                var data = {
                    username: self.username,
                    password: self.password
                };

                Backend.postLoginData(data).then(
                    function (resp) {
                        User.setUser(resp.data);
                        $location.path('/');
                    },
                    function (resp) {
                        if (resp.status == 401) {
                            self.error = resp.data.error.join(", ");
                        } else {
                            self.error = resp.data.error;
                        }
                        self.password = "";
                    }
                );
            };
        }
    ]
});
