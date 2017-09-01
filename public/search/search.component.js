'use strict';

angular
  .module('search')
  .component('search', {
    templateUrl: "search/search.template.html",
    controller: ['$routeParams',
        function ($routeParams) {
            this.query = $routeParams.query;
        }
    ]
});
