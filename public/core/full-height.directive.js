'use strict';

angular
  .module('core')
  .directive('fullHeight', ['$window',
    function ($window) {
        return {
            restrict: 'A',
            scope: {
                margin: "=fullHeight"
            },
            link: function (scope, element, attrs) {
                setHeight(element, $window.innerHeight - scope.margin);
                angular.element($window).bind('resize', function() {
                    setHeight(element, $window.innerHeight - scope.margin);
                });
            }
        };

        function setHeight(element, height) {
            element.css("height", height + "px");
        }
    }
]);
