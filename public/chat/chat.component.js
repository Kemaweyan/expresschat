'use strict';

angular
  .module('chat')
  .component('chat', {
    templateUrl: "chat/chat.template.html",
    controller: ['$routeParams', 'Chat',
        function ($routeParams, Chat) {
            var self = this;
            self.buddyName = "Mohamed Djudaev";
            self.buddyAvatar = "/images/100/no-avatar.png";

            Chat.setActiveChat($routeParams.chatId);
        }
    ]
});
