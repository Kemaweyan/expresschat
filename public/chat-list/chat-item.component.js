'use strict';

angular
  .module('chatList')
  .component('chatItem', {
    templateUrl: "chat-list/chat-item.template.html",
    bindings: {
        chat: "<"
    },
    controller: ['Chat',
        function (Chat) {
            var self = this;
            self.activeChat = Chat.activeChat;

            self.$onInit = function () {
                var avatar = self.chat.buddy.avatar;
                self.buddyAvatar = avatar ? "/images/avatars/48/" + avatar : "/images/48/no-avatar.png";
                self.buddyName = self.chat.buddy.firstname + " " + self.chat.buddy.lastname;
            };

            self.openChat = function () {
                self.chat.unread = false;
                Chat.open(self.chat.id);
            };
        }
    ]
});
