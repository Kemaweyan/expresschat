'use strict';

angular
  .module('mainPage')
  .component('mainPage', {
    templateUrl: 'main-page/main-page.template.html',
    controller: ['User', 'ChatList', '$location',
        function (User, ChatList, $location) {
            var self = this;
            self.user = User;
            self.chats = ChatList.chats;

            self.search = function () {
                $location.path('/search/' + self.query);
            };

            self.openChat = function (buddyId) {
                $location.path('/chat/' + buddyId);
            };
        }
    ]
});
