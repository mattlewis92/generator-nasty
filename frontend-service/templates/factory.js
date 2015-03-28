'use strict';

angular
  .module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.services')
  .factory('<%= serviceName %>', function() {

    return {};

  });
