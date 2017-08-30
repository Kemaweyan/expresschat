'use strict';

angular
  .module('chat')
  .component('chat', {
    templateUrl: "chat/chat.template.html",
    controller: ['$routeParams', 'Chat',
        function ($routeParams, Chat) {
            var self = this;

            Chat.setActiveChat($routeParams.chatId);
        }
    ]
});
