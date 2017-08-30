'use strict';

angular
  .module('chatList')
  .component('chatList', {
    templateUrl: "chat-list/chat-list.template.html",
    controller: ['ChatList',
        function (ChatList) {
            var self = this;
            self.chats = ChatList.chats;
            ChatList.start();
        }
    ]
});
