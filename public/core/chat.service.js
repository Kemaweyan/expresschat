'use strict';

angular
  .module('core')
  .service('Chat', ['Backend', '$location', '$rootScope', '$interval',
    function (Backend, $location, $rootScope, $interval) {
        var self = this;
        self.chat = null;
        self.buddy = null;
        self.activeChat = {id: null};
        self.chats = [];
        var promise;

        self.open = function (id) {
            $location.path('/chat/' + id);
        };

        self.setActiveChat = function (chat) {
            self.activeChat.id = chat.id;
            self.chat = chat;
        }

        $rootScope.$on('$routeChangeStart', function (event, current, previous, reject) {
            if (current.$$route.originalPath != "/chat/:chatId") {
                self.activeChat.id = null;
                self.chat = null;
                self.buddy = null;
            }
        });

        self.start = function () {
            getPostList();
            promise = $interval(getPostList, 1000);
        };

        self.stop = function () {
            $interval.cancel(promise);
        };

        self.getBuddyInfo = function () {
            return Backend.getUserInfo(self.chat.buddyId).then(
                function (resp) {
                    self.buddy = resp.data;
                    return self.buddy;
                },
                function (resp) {

                }
            );
        };

        function getPostList() {
            
        }
    }
]);
