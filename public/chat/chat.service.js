'use strict';

angular
  .module('chat')
  .service('Chat', ['Backend', '$location', '$rootScope',
    function (Backend, $location, $rootScope) {
        var self = this;
        self.activeChat = {id: null};

        self.open = function (id) {
            self.setActiveChat(id);
            $location.path('/chat/' + id);
        };

        self.setActiveChat = function (id) {
            self.activeChat.id = id;
        }

        $rootScope.$on('$routeChangeStart', function (event, current, previous, reject) {
            if (current.$$route.originalPath != "/chat/:chatId") {
                self.activeChat.id = null;
            }
        });
    }
]);
