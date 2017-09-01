'use strict';

angular
  .module('core')
  .service('Chat', ['Backend', 'User', '$rootScope', '$interval',
    function (Backend, User, $rootScope, $interval) {
        var self = this;
        self.activeChat = {id: null};
        self.chat = null;
        self.posts = [];
        var intervalPromise;

        self.setActiveChat = function (id) {
            self.activeChat.id = id;
        }

        $rootScope.$on('$routeChangeStart', function (event, current, previous, reject) {
            if (!current.$$route || current.$$route.originalPath != "/chat/:chatId") {
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

        self.send = function (text) {
            var data = {
                text: text,
                buddyId: self.chat.buddy.id
            };

            Backend.postNewMessage(data).then(
                function (resp) {
                    
                },
                function (resp) {
                    
                }
            );
        };

        function getPostTime(post) {
            var date = new Date(post.date);
            var now = new Date();

            if (date.getDate() == now.getDate() &&
                date.getMonth() == now.getMonth() &&
                date.getYear() == now.getYear()) {

                return date.toLocaleTimeString("ru");
            }

            return date.toLocaleString("ru");
        }

        function getPostList() {
            return Backend.getChat(self.activeChat.id).then(
                function (resp) {
                    self.chat = resp.data.chat;
                    var posts = resp.data.posts;
                    posts.reverse();
                    posts.forEach(function (post, index, array) {
                        var postIndex = self.posts.findIndex(function (element, index, array) {
                            return element.id == post.id;
                        });

                        if (postIndex < 0) {
                            post.isLocal = post.authorId == User.id;
                            post.time = getPostTime(post);
                            self.posts.push(post);
                        }
                    });
                    return self.chat;
                },
                function (resp) {

                }
            );
        }

        self.getPreviousPostList = function() {
            return Backend.getChat(self.activeChat.id, self.posts.length).then(
                function (resp) {
                    var posts = resp.data.posts;
                    posts.forEach(function (post, index, array) {
                        var postIndex = self.posts.findIndex(function (element, index, array) {
                            return element.id == post.id;
                        });

                        if (postIndex < 0) {
                            post.isLocal = post.authorId == User.id;
                            post.time = getPostTime(post);
                            self.posts.unshift(post);
                        }
                    });
                },
                function (resp) {

                }
            );
        };
    }
]);
