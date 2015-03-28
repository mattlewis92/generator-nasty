'use strict';

angular
  .module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.filters')
  .filter('<%= filterName %>', function() {

    return function(input) {
      return input;
    };

  });
