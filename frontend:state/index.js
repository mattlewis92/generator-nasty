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
      name: 'stateName',
      message: 'What is the state name?',
      validate: function(input) {
        return !!input;
      }
    }, {
      name: 'url',
      message: 'What is the url, relative to the parent state?',
      validate: function(input) {
        return !!input;
      }
    }, {
      name: 'hasStyle',
      message: 'Does the state require a stylesheet?',
      type: 'confirm',
      default: false
    }, {
      name: 'viewName',
      message: 'What is the view name? (optional)'
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.stateName = props.stateName;
      this.viewName = props.viewName;
      this.url = props.url;
      this.angularAppName = this.config.get('app').angularAppName;
      var controllerParts = [];
      controllerParts.push(util.capitaliseFirstLetter(this.moduleName));
      this.stateName.split('.').forEach(function(part) {
        controllerParts.push(util.capitaliseFirstLetter(part));
      });
      this.controllerName = controllerParts.join('') + 'Ctrl';
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = util.getFrontendFolder(this.config) + '/' + this.moduleName + '/states/' + this.stateName + '/';
    this.mkdir(folder);
    var fileBase = folder + this.moduleName + '.' + this.stateName;

    this.copy('controller.js', fileBase + '.ctrl.js');
    if (this.hasStyle) {
      this.copy('stylesheet.less', fileBase + '.style.less');
    }
    this.copy('template.html', fileBase + '.html');

    var stateConfigFile = util.getFrontendFolder(this.config) + '/' + this.moduleName + '/states/' + this.moduleName + '.states.js';
    var stateConfig = this.dest.read(stateConfigFile);

    var parentStateName = stateConfig.match(/\.state\(\'(.*)', {/)[1];

    if (!this.viewName) {
      var stateToAdd = [
        "",
        ".state('" + parentStateName + "." + this.stateName + "', {",
        "  url: '" + this.url + "',",
        "  templateUrl: 'app/" + this.moduleName + "/states/" + this.stateName + "/" + this.moduleName + "." + this.stateName + ".html',",
        "  controller: '" + this.controllerName + " as vm'",
        "});"
      ].join('\n      ');
    } else {
      var stateToAdd = [
        "",
        ".state('" + parentStateName + "." + this.stateName + "', {",
        "  url: '" + this.url + "',",
        "  views: {",
        "    '" + this.viewName + "': {",
        "      templateUrl: 'app/" + this.moduleName + "/states/" + this.stateName + "/" + this.moduleName + "." + this.stateName + ".html',",
        "      controller: '" + this.controllerName + " as vm'",
        "    }",
        "  }",
        "});"
      ].join('\n      ');
    }


    stateConfig = util.replaceNthLastOccurenceOf(2, stateConfig, '});', '})' + stateToAdd);
    this.dest.write(stateConfigFile, stateConfig);

  }
});

module.exports = NastyGenerator;
