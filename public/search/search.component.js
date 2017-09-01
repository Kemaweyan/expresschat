'use strict';

angular
  .module('search')
  .component('search', {
    templateUrl: "search/search.template.html",
    controller: ['$routeParams', 'Backend', 'BuddyList', '$location',
        function ($routeParams, Backend, BuddyList, $location) {
            var self = this;
            self.newQuery = $routeParams.query;

            Backend.getUsers($routeParams.query).then(
                function (resp) {
                    self.query = resp.data.query;
                    self.buddies = resp.data.buddies.map(function (buddy) {
                        return BuddyList.addBuddy(buddy);
                    });
                },
                function (resp) {
                    
                }
            );

            self.openChat = function (buddyId) {
                $location.path('/chat/' + buddyId);
            };
        }
    ]
});
