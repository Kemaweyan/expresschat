'use strict';

angular
  .module('chatList')
  .component('chatItem', {
    templateUrl: "chat-list/chat-item.template.html",
    bindings: {
        chat: "<"
    },
    controller: ['Backend', 'Chat',
        function (Backend, Chat) {
            var self = this;
            self.activeChat = Chat.activeChat;

            self.$onInit = function () {
                self.unread = self.chat.unread;

                Backend.getUserInfo(self.chat.buddyId).then(
                    function (resp) {
                        var avatar = resp.data.avatar;
                        self.buddyAvatar = avatar ? "/images/avatars/48/" + avatar : "/images/48/no-avatar.png";
                        self.buddyName = resp.data.firstname + " " + resp.data.lastname;
                    }
                );
            };

            self.openChat = function () {
                self.unread = false;
                Chat.open(self.chat.id);
            };
        }
    ]
});
