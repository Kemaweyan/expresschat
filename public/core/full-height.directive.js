'use strict';

angular
  .module('core')
  .directive('fullHeight', ['$window',
    function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                setHeight(element, $window.innerHeight);
                angular.element($window).bind('resize', function() {
                    setHeight(element, $window.innerHeight);
                });
            }
        };

        function setHeight(element, height) {
            element.css("height", height + "px");
        }
    }
]);
