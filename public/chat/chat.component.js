'use strict';

angular
  .module('chat')
  .component('chat', {
    templateUrl: "chat/chat.template.html",
    controller: ['$routeParams', 'Chat', 'ChatList', 'Backend',
        function ($routeParams, Chat, ChatList, Backend) {
            var self = this;
            var chat = ChatList.getChat($routeParams.chatId);

            self.posts = Chat.posts;
            Chat.setActiveChat(chat);
            Chat.start();

            self.submit = function () {
                
            };

            Chat.getBuddyInfo().then(
                function (buddy) {
                    var avatar = buddy.avatar;
                    self.buddyAvatar = avatar ? "/images/avatars/100/" + avatar : "/images/100/no-avatar.png";
                    self.buddyName = buddy.firstname + " " + buddy.lastname;
                }
            );
        }
    ]
});
