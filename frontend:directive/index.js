'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var NastyGenerator = yeoman.generators.Base.extend({

  prompting: function () {

    var done = this.async();

    var prompts = [{
      name: 'moduleName',
      message: 'What is the module name?'
    }, {
      name: 'directiveName',
      message: 'What is the directive name? (in camel case)'
    }, {
      name: 'hasTemplate',
      message: 'Does the directive require a template?',
      type: 'confirm',
      default: false
    }, {
      name: 'hasStyle',
      message: 'Does the directive require a stylesheet?',
      type: 'confirm',
      default: false
    }, {
      name: 'hasController',
      message: 'Does the directive require a controller?',
      type: 'confirm',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.angularAppName = this.config.get('app').angularAppName;
      for (var key in props) {
        this[key] = props[key];
      }
      this.controllerName = capitaliseFirstLetter(this.moduleName) + capitaliseFirstLetter(this.directiveName) + 'Ctrl';
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = 'frontend/development/app/' + this.moduleName + '/directives/' + this.directiveName + '/';
    this.mkdir(folder);
    this.copy('directive.js', folder + this.moduleName + '.' + this.directiveName + '.directive.js');

    if (this.hasTemplate) {
      this.copy('template.html', folder + this.moduleName + '.' + this.directiveName + '.template.html');
    }

    if (this.hasStyle) {
      this.copy('stylesheet.less', folder + this.moduleName + '.' + this.directiveName + '.style.less');
    }

    if (this.hasController) {
      this.copy('controller.js', folder + this.moduleName + '.' + this.directiveName + '.ctrl.js');
    }

  }
});

module.exports = NastyGenerator;
