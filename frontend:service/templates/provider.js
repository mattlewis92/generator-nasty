'use strict';

angular
  .module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.services')
  .provider('<%= serviceName %>', function() {

    this.$get = function() {

    };

  });
