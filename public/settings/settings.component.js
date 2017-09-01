'use strict';

angular
  .module('settings')
  .component('settings', {
    templateUrl: "settings/settings.template.html",
    controller: ['Backend', 'User',
        function (Backend, User) {
            var self = this;

            self.submit = function () {

            };
        }
    ]
});
