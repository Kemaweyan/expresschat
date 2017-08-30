'use strict';

angular
  .module('chatList')
  .component('chatList', {
    templateUrl: "chat-list/chat-list.template.html",
    controller: ['Backend',
        function (Backend) {
            var self = this;
            self.emptyList = false;

            Backend.getChatList().then(
                function (resp) {
                    if (resp.data.length > 0) {
                        self.chats = resp.data;
                        self.emptyList = false;
                    } else {
                        self.emptyList = true;
                    }
                }
            );
        }
    ]
});
