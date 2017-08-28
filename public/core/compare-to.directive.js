'use strict';

angular
  .module('core')
  .directive('compareTo', function () {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                return value == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});
