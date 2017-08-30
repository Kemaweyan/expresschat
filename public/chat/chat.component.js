'use strict';

angular
  .module('chat')
  .component('chat', {
    templateUrl: "chat/chat.template.html",
    controller: ['$routeParams', 'Chat', 'ChatList', 'Backend',
        function ($routeParams, Chat, ChatList, Backend) {
            var self = this;
            var chat = ChatList.getChat($routeParams.chatId);

            if (!chat) {
                console.log("chat not found");
            }

            self.chats = Chat.chats;
            Chat.setActiveChat(chat);
            Chat.start();

            self.submit = function () {
                
            };

            Backend.getUserInfo(chat.buddyId).then(
                function (resp) {
                    var avatar = resp.data.avatar;
                    self.buddyAvatar = avatar ? "/images/avatars/100/" + avatar : "/images/100/no-avatar.png";
                    self.buddyName = resp.data.firstname + " " + resp.data.lastname;
                },
                function (resp) {

                }
            );
        }
    ]
});
