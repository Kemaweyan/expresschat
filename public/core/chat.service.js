'use strict';

angular
  .module('core')
  .service('Chat', ['Backend', 'User', 'BuddyList', '$rootScope', '$interval', '$location',
    function (Backend, User, BuddyList, $rootScope, $interval, $location) {
        var self = this;
        self.buddy = null;
        self.posts = [];
        var intervalPromise;

        $rootScope.$on('$routeChangeStart', function (event, current, previous, reject) {
            if (!current.$$route || current.$$route.originalPath != "/chat/:buddyId") {
                self.buddy = null;
            }
            self.stop();
            self.posts.length = 0;
        });

        self.start = function (buddy) {
            self.buddy = buddy;
            getPostList();
            intervalPromise = $interval(getPostList, 1000);
        };

        self.stop = function () {
            $interval.cancel(intervalPromise);
        };

        self.send = function (text) {
            Backend.postNewMessage(self.buddy.id, text).then(
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
            Backend.getChat(self.buddy.id).then(
                function (resp) {
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

                    BuddyList.addBuddy(resp.data.chat.buddy);
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
