'use strict';

angular
  .module('chatList')
  .service('ChatList', ['Backend', '$timeout',
    function (Backend, $timeout) {
        var self = this;
        self.chats = [];

        var getChatList = function () {
            Backend.getChatList().then(
                function (resp) {
                    resp.data.forEach(function (current, index, array) {
                        var chatIndex = self.chats.findIndex(function (element, index, array) {
                            return element.id == current.id;
                        });

                        if (chatIndex < 0) {
                            self.chats.push(current);
                        } else {
                            if (current.unread != self.chats[index].unread) {
                                self.chats[index].unread = current.unread;
                            }
                        }
                    });

                    $timeout(getChatList, 2000);
                },
                function (resp) {
                    
                }
            );
        };

        getChatList();
    }
]);
