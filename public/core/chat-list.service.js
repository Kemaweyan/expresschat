'use strict';

angular
  .module('core')
  .service('ChatList', ['Backend', 'BuddyList', '$interval', '$rootScope',
    function (Backend, BuddyList, $interval, $rootScope) {
        var self = this;
        self.chats = [];
        var intervalPromise;

        var getChatList = function () {
            Backend.getChatList().then(
                function (resp) {
                    resp.data.forEach(function (chat, index, array) {
                        var chatIndex = self.chats.findIndex(function (element, index, array) {
                            return element.id == chat.id;
                        });

                        if (chatIndex < 0) {
                            self.chats.push(chat);
                        } else {
                            if (chat.unread != self.chats[index].unread) {
                                self.chats[index].unread = chat.unread;
                            }
                        }

                        chat.buddy = BuddyList.addBuddy(chat.buddy);
                    });
                },
                function (resp) {

                }
            );
        };

        self.start = function () {
            getChatList();
            intervalPromise = $interval(getChatList, 1000);
        }

        self.stop = function () {
            $interval.cancel(intervalPromise);
        };

        $rootScope.$watch('authorized', function () {
            if (!$rootScope.authorized) {
                self.stop();
                self.chats.length = 0;
            }
        });
    }
]);
