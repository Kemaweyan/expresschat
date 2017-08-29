'use strict';

angular
  .module('chatItem')
  .component('chatItem', {
    templateUrl: "chat-item/chat-item.template.html",
    bindings: {
        chat: "<"
    },
    controller: ['Backend',
        function (Backend) {
            var self = this;

            self.$onInit = function () {
                Backend.getUserInfo(self.chat.buddyId).then(
                    function (resp) {
                        var avatar = resp.data.avatar;
                        self.buddyAvatar = avatar ? "/images/avatars/48/" + avatar : "/images/48/no-avatar.png";
                        self.buddyName = resp.data.firstname + " " + resp.data.lastname;
                    }
                );
            };
        }
    ]
});
