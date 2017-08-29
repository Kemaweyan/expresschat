'use strict';

angular
  .module('chatItem')
  .component('chatItem', {
    templateUrl: "chat-item/chat-item.template.html",
    bindings: {
        chat: "<",
        activeChat: "="
    },
    controller: ['Backend', '$location',
        function (Backend, $location) {
            var self = this;

            self.$onInit = function () {
                self.unread = self.chat.unread;

                Backend.getUserInfo(self.chat.buddyId).then(
                    function (resp) {
                        var avatar = resp.data.avatar;
                        self.buddyAvatar = avatar ? "/images/avatars/48/" + avatar : "/images/48/no-avatar.png";
                        self.buddyName = resp.data.firstname + " " + resp.data.lastname;
                    }
                );
            };

            self.openChat = function () {
                self.unread = false;
                self.activeChat = self.chat.id;

                $location.path('/chat/' + self.chat.id);
            };
        }
    ]
});
