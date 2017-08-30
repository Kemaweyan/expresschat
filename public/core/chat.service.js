'use strict';

angular
  .module('core')
  .service('Chat', ['Backend', '$location', '$rootScope', '$interval',
    function (Backend, $location, $rootScope, $interval) {
        var self = this;
        self.activeChat = {id: null};
        self.chats = [];
        var promise;

        self.open = function (id) {
            $location.path('/chat/' + id);
        };

        self.setActiveChat = function (chat) {
            self.activeChat.id = chat.id;
        }

        $rootScope.$on('$routeChangeStart', function (event, current, previous, reject) {
            if (current.$$route.originalPath != "/chat/:chatId") {
                self.activeChat.id = null;
            }
        });

        self.start = function () {
            getPostList();
            promise = $interval(getPostList, 1000);
        };

        self.stop = function () {
            $interval.cancel(promise);
        };

        function getPostList() {
            
        }
    }
]);
