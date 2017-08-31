'use strict';

angular
  .module('core')
  .directive('pressEnter', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.pressEnter);
                    });
                    event.preventDefault();
                }
            });
        }
    };
});
