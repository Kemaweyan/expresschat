'use strict';

angular
  .module('core')
  .directive('scrollToTop', function () {
    return {
        link: function (scope, element, attrs) {
            var watchListener = null;

            element.on('scroll', function (e) {
                if (!e.target.scrollTop) {
                    var oldElement = element.find('div')[0];
                    if (watchListener) {
                        watchListener();
                    }
                    scope.$apply(function () {
                        scope.$eval(attrs.scrollToTop);

                        watchListener = scope.$watch(
                            function () {
                                return oldElement.offsetTop;
                            },
                            function (oldVal, newVal) {
                                if (oldVal != newVal) {
                                    e.target.scrollTop = oldElement.offsetTop - e.target.offsetTop - 10;
                                }
                            }
                        );
                    });
                }
            });
        }
    };
});
