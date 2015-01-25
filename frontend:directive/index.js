'use strict';
var util = require('../util');
var yeoman = require('yeoman-generator');

var NastyGenerator = yeoman.generators.Base.extend({

  prompting: function () {

    var done = this.async();

    var prompts = [{
      name: 'moduleName',
      message: 'What is the module name?',
      type: 'list',
      choices: util.getFrontendModuleList(process.cwd(), this.config)
    }, {
      name: 'directiveName',
      message: 'What is the directive name? (in camel case)',
      validate: function(input) {
        return !!input;
      }
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
      this.controllerName = util.capitaliseFirstLetter(this.moduleName) + util.capitaliseFirstLetter(this.directiveName) + 'Ctrl';
      done();
    }.bind(this));

  },

  writing: function () {

    this.directiveNamePrefixed = this.directiveName;
    if (this.config.get('app').directivePrefix) {
      this.directiveNamePrefixed = this.config.get('app').directivePrefix + util.capitaliseFirstLetter(this.directiveName);
    }

    var folder = util.getFrontendFolder(this.config) + '/' + this.moduleName + '/directives/' + this.directiveName + '/';
    this.mkdir(folder);
    this.copy('directive.js', folder + this.moduleName + '.' + this.directiveName + '.directive.js');

    if (this.hasTemplate) {
      this.copy('template.html', folder + this.moduleName + '.' + this.directiveName + '.html');
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
