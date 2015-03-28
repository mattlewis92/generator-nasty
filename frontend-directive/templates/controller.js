'use strict';

angular
  .module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.directives')
  .classy
  .controller({

    name: '<%= controllerName %>',

    inject: []

  });
