'use strict';

angular
  .module('core')
  .service('Chat', ['Backend', 'User', 'BuddyList', '$rootScope', '$interval',
    function (Backend, User, BuddyList, $rootScope, $interval) {
        var self = this;
        self.id = null;
        self.buddy = null;
        self.posts = [];
        var intervalPromise;

        $rootScope.$on('$routeChangeStart', function (event, current, previous, reject) {
            if (!current.$$route || current.$$route.originalPath != "/chat/:buddyId") {
                self.buddy = null;
                self.id = null;
            }
            self.stop();
            self.posts.length = 0;
        });

        self.start = function (buddy) {
            self.buddy = buddy;
            var promise = getPostList();
            intervalPromise = $interval(getPostList, 1000);
            return promise;
        };

        self.stop = function () {
            $interval.cancel(intervalPromise);
        };

        self.send = function (text) {
            Backend.postNewMessage(self.buddy.id, text).then(
                null,
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
            return Backend.getChat(self.buddy.id).then(
                function (resp) {
                    self.id = resp.data.chat.id;
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

                    return BuddyList.addBuddy(resp.data.chat.buddy);
                },
                function (resp) {

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
