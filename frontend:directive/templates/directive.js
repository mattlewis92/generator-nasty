'use strict';

angular
  .module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.directives')
  .directive('<%= directiveNamePrefixed %>', function() {

    return {
      restrict: '<% if (hasTemplate) { %>E<% } else { %>A<% } %>',<% if (hasTemplate) { %>
      templateUrl: 'app/<%= moduleName %>/directives/<%= directiveName %>/<%= moduleName %>.<%= directiveName %>.html',<% } %><% if (hasController) { %>
      controller: angular.module('<%= _.slugify(angularAppName) %>.<%= moduleName %>.states').classy.controller({

        inject: []

      }),
      controllerAs: 'vm',
      bindToController: true,<% } %>
      link: function(scope, elm, attrs) {

      }
    };

  });
