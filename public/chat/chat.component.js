'use strict';

angular
  .module('chat')
  .component('chat', {
    templateUrl: "chat/chat.template.html",
    controller: ['$routeParams', 'Chat',
        function ($routeParams, Chat) {
            var self = this;

            self.posts = Chat.posts;
            Chat.setActiveChat($routeParams.chatId);
            Chat.start().then(
                function (chat) {
                    var avatar = chat.buddy.avatar;
                    self.buddyAvatar = avatar ? "/images/avatars/100/" + avatar : "/images/100/no-avatar.png";
                    self.buddyName = chat.buddy.firstname + " " + chat.buddy.lastname;
                }
            );

            self.submit = function () {
                
            };
        }
    ]
});
