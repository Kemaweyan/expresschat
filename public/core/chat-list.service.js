'use strict';

angular
  .module('core')
  .service('ChatList', ['Backend', 'BuddyList', '$rootScope', '$q',
    function (Backend, BuddyList, $rootScope, $q) {
        var self = this;
        self.chats = [];
        var cancelPromise;

        var getChatListUpdates = function () {
            Backend.getChatListUpdates(cancelPromise.promise).then(
                function (resp) {
                    var chat = resp.data;
                    var chatIndex = self.chats.findIndex(function (element, index, array) {
                        return element.id == chat.id;
                    });

                    if (chatIndex < 0) {
                        self.chats.push(chat);
                    } else {
                        if (chat.unread != self.chats[chatIndex].unread) {
                            self.chats[chatIndex].unread = chat.unread;
                        }
                    }

                    chat.buddy = BuddyList.addBuddy(chat.buddy);
                },
                function (resp) {
                    /*if (resp.status < 0 && resp.xhrStatus == "error") {
                        self.stop();
                    }*/
                }
            ).finally(
                function () {
                    if (cancelPromise && cancelPromise.promise.$$state.status == 0) {
                        getChatListUpdates();
                    }
                }
            );
        };

        var getChatList = function () {
            Backend.getChatList().then(
                function (resp) {
                    resp.data.forEach(function (chat, index, array) {
                        self.chats.push(chat);
                        chat.buddy = BuddyList.addBuddy(chat.buddy);
                    });

                    getChatListUpdates();
                },
                function (resp) {
                    
                }
            );
        };

        self.start = function () {
            cancelPromise = $q.defer();
            getChatList();
        }

        self.stop = function () {
            if (cancelPromise) {
                cancelPromise.resolve();
            }
        };

        $rootScope.$watch('authorized', function () {
            if (!$rootScope.authorized) {
                self.stop();
                self.chats.length = 0;
            }
        });
    }
]);
