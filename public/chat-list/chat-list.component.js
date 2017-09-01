'use strict';

angular
  .module('chatList')
  .component('chatList', {
    templateUrl: "chat-list/chat-list.template.html",
    controller: ['ChatList', 'Chat', '$location',
        function (ChatList, Chat, $location) {
            var self = this;
            self.chats = ChatList.chats;
            self.activeChat = Chat;
            ChatList.start();

            self.openChat = function (buddyId) {
                $location.path('/chat/' + buddyId);
            };

            self.search = function () {
                $location.path('/search/' + self.query);
                self.query = "";
            };
        }
    ]
});
