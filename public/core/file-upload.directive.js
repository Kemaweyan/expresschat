'use strict';

angular
  .module('core')
  .directive('fileUpload', [
    function () {
        return {
            restrict: 'A',
            scope: {
                file: "=fileUpload"
            },
            link: function (scope, element, attrs) {
                element.bind("change", function(changeEvent) {
                    scope.file = changeEvent.target.files[0];
                });
            }
        };
    }
]);
