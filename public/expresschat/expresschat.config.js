'use strict';

angular.module('expressChat')
  .config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
        .when('/', {
            template: '<main-page></main-page>'
        })
        .when('/login', {
            template: '<login></login>'
        })
        .when('/register', {
            template: '<register></register>'
        })
        .when('/chat/:buddyId', {
            template: '<chat></chat>'
        })
        .when('/search/:query', {
            template: '<search></search>'
        })
        .when('/settings', {
            template: '<settings></settings>'
        }).otherwise('/');
    }
]);
