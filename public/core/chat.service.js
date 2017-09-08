'use strict';

angular
  .module('core')
  .service('Chat', ['Backend', 'User', 'BuddyList', '$rootScope', '$q', '$location',
    function (Backend, User, BuddyList, $rootScope, $q, $location) {
        var self = this;
        self.buddy = null;
        self.posts = [];
        self.chatId = null;
        var cancelPromise;

        $rootScope.$on('$routeChangeStart', function (event, current, previous, reject) {
            if (!current.$$route || current.$$route.originalPath != "/chat/:buddyId") {
                self.buddy = null;
                self.chatId = null;
            }
            self.stop();
            self.posts.length = 0;
        });

        self.start = function (buddy) {
            self.buddy = buddy;
            cancelPromise = $q.defer();
            getPostList();
        };

        self.stop = function () {
            if (cancelPromise) {
                cancelPromise.resolve();
            }
        };

        self.send = function (text) {
            Backend.postNewMessage(self.buddy.id, text).then(
                function (resp) {
                    if (!self.chatId) {
                        getPostList();
                    }
                },
                function (resp) {
                    
                }
            );
        };

        function getChatUpdates () {
            Backend.getChatUpdates(self.chatId, cancelPromise.promise).then(
                function (resp) {
                    var post = resp.data;
                    post.isLocal = post.authorId == User.id;
                    post.time = getPostTime(post);
                    self.posts.push(post);
                },
                function (resp) {
                    /*if (resp.status < 0 && resp.xhrStatus == "error") {
                        self.stop();
                    }*/
                }
            ).finally(
                function () {
                    if (cancelPromise && cancelPromise.promise.$$state.status == 0) {
                        getChatUpdates();
                    }
                }
            );
        }

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
            Backend.getChat(self.buddy.id).then(
                function (resp) {
                    var posts = resp.data.posts;
                    posts.forEach(function (post, index, array) {
                        post.isLocal = post.authorId == User.id;
                        post.time = getPostTime(post);
                        self.posts.unshift(post);
                    });

                    BuddyList.addBuddy(resp.data.chat.buddy);

                    if (resp.data.chat.id) {
                        self.chatId = resp.data.chat.id;
                        getChatUpdates();
                    }
                },
                function (resp) {
                    if (resp.status == 404) {
                        $location.path('/');
                    }
                }
            );
        }

        self.getPreviousPostList = function() {
            return Backend.getChat(self.buddy.id, self.posts.length).then(
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
