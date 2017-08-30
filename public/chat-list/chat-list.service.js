'use strict';

angular
  .module('chatList')
  .service('ChatList', ['Backend', '$interval', '$rootScope',
    function (Backend, $interval, $rootScope) {
        var self = this;
        self.chats = [];
        var promise;

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
                },
                function (resp) {

                }
            );
        };

        self.start = function () {
            getChatList();
            promise = $interval(getChatList, 2000);
        }

        self.stop = function () {
            $interval.cancel(promise);
        };

        $rootScope.$watch('authorized', function () {
            if (!$rootScope.authorized) {
                self.stop();
            }
        });
    }
]);
