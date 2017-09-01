'use strict';

angular
  .module('chatList')
  .component('chatItem', {
    templateUrl: "chat-list/chat-item.template.html",
    bindings: {
        chat: "<"
    },
    controller: ['Chat', 'BuddyList', '$location',
        function (Chat, BuddyList, $location) {
            var self = this;
            self.activeChat = Chat.activeChat;
            self.buddy = {};

            self.$onInit = function () {
                self.buddy = BuddyList.getBuddy(self.chat.buddy.id);
            };

            self.openChat = function () {
                self.chat.unread = false;
                $location.path('/chat/' + self.chat.id);
            };
        }
    ]
});
