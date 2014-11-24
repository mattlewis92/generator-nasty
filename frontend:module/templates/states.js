'use strict';

angular
  .module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.states')
  .config(function($stateProvider) {

    $stateProvider
      .state('<%= moduleName %>', {
        url: '/<%= moduleName %>',
        abstract: true,
        template: '<ui-view/>'
      });

  });
