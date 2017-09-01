'use strict';

angular
  .module('chatList')
  .component('chatList', {
    templateUrl: "chat-list/chat-list.template.html",
    controller: ['ChatList', 'Chat', '$location',
        function (ChatList, Chat, $location) {
            var self = this;
            self.chats = ChatList.chats;
            self.activeChat = Chat.activeChat;
            ChatList.start();

            self.openChat = function (chatId) {
                $location.path('/chat/' + chatId);
            };
        }
    ]
});
