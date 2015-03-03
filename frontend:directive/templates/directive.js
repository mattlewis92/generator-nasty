'use strict';

angular
  .module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.directives')
  .directive('<%= directiveNamePrefixed %>', function() {
    return {
      restrict: 'EA',<% if (hasTemplate) { %>
      templateUrl: 'app/<%= moduleName %>/directives/<%= directiveName %>/<%= moduleName %>.<%= directiveName %>.html',<% } %><% if (hasController) { %>
      controller: '<%= controllerName %>',
      controllerAs: 'vm',
      bindToController: true,<% } %>
      link: function(scope, elm, attrs) {

      }
    };

  });
