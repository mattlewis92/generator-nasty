'use strict';

angular
  .module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.directives')
  .directive('<%= directiveNamePrefixed %>', function() {
    return {
      restrict: 'EA',<% if (hasTemplate) { %>
      templateUrl: 'app/<%= moduleName %>/directives/<%= directiveName %>/<%= moduleName %>.<%= directiveName %>.html',<% } %><% if (hasController) { %>
      controller: '<%= controllerName %>',
      controllerAs: '<%= directiveName %>Ctrl',<% } %>
      link: function(scope, elm, attrs) {

      }
    };

  });
