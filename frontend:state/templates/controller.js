'use strict';

angular
  .module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.states')
  .classy
  .controller({

    name: '<%= controllerName %>',

    inject: []

  });
