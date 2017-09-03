'use strict';

angular
  .module('chat')
  .component('chat', {
    templateUrl: "chat/chat.template.html",
    controller: ['$routeParams', 'Chat', 'User', 'BuddyList',
        function ($routeParams, Chat, User, BuddyList) {
            var self = this;
            self.user = User;
            self.buddy = BuddyList.getBuddy($routeParams.buddyId);

            self.posts = Chat.posts;
            Chat.start(self.buddy);

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
