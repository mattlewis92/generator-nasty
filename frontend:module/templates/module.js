'use strict';

angular.module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.directives', []);

angular.module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.states', [
  'classy'
]).classy.options.controller = {
  addFnsToScope: false
};

angular.module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.services', []);

angular.module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.filters', []);

angular.module('<%= _.slugify(angularAppName) %>.<%= moduleName %>', [
  '<%= _.slugify(angularAppName) %>.<%= moduleName %>.states',
  '<%= _.slugify(angularAppName) %>.<%= moduleName %>.services',
  '<%= _.slugify(angularAppName) %>.<%= moduleName %>.filters',
  '<%= _.slugify(angularAppName) %>.<%= moduleName %>.directives'
]);
