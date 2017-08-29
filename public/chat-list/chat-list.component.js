'use strict';

angular
  .module('chatList')
  .component('chatList', {
    templateUrl: "chat-list/chat-list.template.html",
    controller: ['Backend', 'User',
        function (Backend, User) {
            var self = this;

            self.chats = [1, 2, 3];
        }
    ]
});
