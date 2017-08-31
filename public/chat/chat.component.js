'use strict';

angular
  .module('chat')
  .component('chat', {
    templateUrl: "chat/chat.template.html",
    controller: ['$routeParams', 'Chat', 'User',
        function ($routeParams, Chat, User) {
            var self = this;
            self.user = User;

            self.posts = Chat.posts;
            Chat.setActiveChat($routeParams.chatId);
            Chat.start().then(
                function (chat) {
                    var avatar = chat.buddy.avatar;
                    self.buddyAvatar = avatar ? "/images/avatars/100/" + avatar : "/images/100/no-avatar.png";
                    self.buddySmallAvatar = avatar ? "/images/avatars/32/" + avatar : "/images/32/no-avatar.png";
                    self.buddyName = chat.buddy.firstname + " " + chat.buddy.lastname;
                }
            );

            self.submit = function () {
                if (self.text) {
                    Chat.send(self.text);
                    self.text = "";
                }
            };

            self.scrollToTop = function () {
                Chat.getPreviousPostList();
            }
        }
    ]
});
