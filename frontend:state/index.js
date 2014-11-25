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
      choices: util.getFrontendModuleList(process.cwd())
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
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.stateName = props.stateName;
      this.url = props.url;
      this.angularAppName = this.config.get('app').angularAppName;
      this.controllerName = util.capitaliseFirstLetter(this.moduleName) + util.capitaliseFirstLetter(this.stateName) + 'Ctrl';
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = 'frontend/development/app/' + this.moduleName + '/states/' + this.stateName + '/';
    this.mkdir(folder);
    var fileBase = folder + this.moduleName + '.' + this.stateName;

    this.copy('controller.js', fileBase + '.ctrl.js');
    this.copy('stylesheet.less', fileBase + '.style.less');
    this.copy('template.html', fileBase + '.html');

    var stateConfigFile = 'frontend/development/app/' + this.moduleName + '/states/' + this.moduleName + '.states.js';
    var stateConfig = this.dest.read(stateConfigFile);

    var stateToAdd = [
      "",
      ".state('" + this.moduleName + "." + this.stateName + "', {",
      "  url: '" + this.url + "',",
      "  templateUrl: 'app/" + this.moduleName + "/states/" + this.stateName + "/" + this.moduleName + "." + this.stateName + ".html',",
      "  controller: '" + this.controllerName + " as " + this.stateName + "Ctrl'",
      "});"
    ].join('\n      ');

    stateConfig = stateConfig.replace('});', '})' + stateToAdd);
    this.dest.write(stateConfigFile, stateConfig);

  }
});

module.exports = NastyGenerator;
