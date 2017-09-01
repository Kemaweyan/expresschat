'use strict';

angular
  .module('chat')
  .component('chat', {
    templateUrl: "chat/chat.template.html",
    controller: ['$routeParams', 'Chat', 'User', 'BuddyList',
        function ($routeParams, Chat, User, BuddyList) {
            var self = this;
            self.user = User;

            self.posts = Chat.posts;
            Chat.setActiveChat($routeParams.chatId);
            Chat.start().then(
                function (chat) {
                    self.buddy = BuddyList.getBuddy(chat.buddy.id);
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
