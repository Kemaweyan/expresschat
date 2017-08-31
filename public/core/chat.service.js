'use strict';

angular
  .module('core')
  .service('Chat', ['Backend', '$location', '$rootScope', '$interval',
    function (Backend, $location, $rootScope, $interval) {
        var self = this;
        self.activeChat = {id: null};
        self.chat = null;
        self.posts = [];
        var intervalPromise;

        self.open = function (id) {
            $location.path('/chat/' + id);
        };

        self.setActiveChat = function (id) {
            self.activeChat.id = id;
        }

        $rootScope.$on('$routeChangeStart', function (event, current, previous, reject) {
            if (current.$$route.originalPath != "/chat/:chatId") {
                self.activeChat.id = null;
                self.chat = null;
            }
            self.stop();
        });

        self.start = function () {
            var promise = getPostList();
            intervalPromise = $interval(getPostList, 1000);
            return promise;
        };

        self.stop = function () {
            $interval.cancel(intervalPromise);
        };

        function getPostList() {
            return Backend.getChat(self.activeChat.id).then(
                function (resp) {
                    self.chat = resp.data.chat;
                    var posts = resp.data.posts;
                    posts.forEach(function (current, index, array) {
                        var postIndex = self.posts.findIndex(function (element, index, array) {
                            return element.id == current.id;
                        });

                        if (postIndex < 0) {
                            self.posts.push(current);
                        }
                    });
                    return self.chat;
                },
                function (resp) {

                }
            );
        }
    }
]);
