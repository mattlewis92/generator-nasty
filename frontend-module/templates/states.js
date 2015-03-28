'use strict';

angular
  .module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.states')
  .config(function($stateProvider) {

    $stateProvider
      .state('<%= stateParentName %><%= moduleName %>', {
        url: '/<%= moduleName %>',
        abstract: true,
        template: '<%= stateParentTemplate %>'
      });

  });
