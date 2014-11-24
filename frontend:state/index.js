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
      name: 'stateName',
      message: 'What is the state name?'
    }, {
      name: 'url',
      message: 'What is the url, relative to the parent state?'
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.stateName = props.stateName;
      this.url = props.url;
      this.angularAppName = this.config.get('app').angularAppName;
      this.controllerName = capitaliseFirstLetter(this.moduleName) + capitaliseFirstLetter(this.stateName) + 'Ctrl';
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = 'frontend/development/app/' + this.moduleName + '/states/' + this.stateName + '/';
    this.mkdir(folder);
    var fileBase = folder + this.moduleName + '.' + this.stateName;

    this.copy('controller.js', fileBase + '.ctrl.js');
    this.copy('stylesheet.less', fileBase + '.style.less');
    this.copy('template.html', fileBase + '.template.html');

    var stateConfigFile = 'frontend/development/app/' + this.moduleName + '/states/' + this.moduleName + '.states.js';
    var stateConfig = this.dest.read(stateConfigFile);

    var stateToAdd = [
      "",
      ".state('" + this.moduleName + "." + this.stateName + "', {",
      "  url: '" + this.url + "',",
      "  templateUrl: 'app/" + this.moduleName + "/states/" + this.stateName + "/" + this.moduleName + "." + this.stateName + ".template.html',",
      "  controller: '" + this.controllerName + " as " + this.stateName + "',",
      "});"
    ].join('\n      ');

    stateConfig = stateConfig.replace('});', '})' + stateToAdd);
    this.dest.write(stateConfigFile, stateConfig);

  }
});

module.exports = NastyGenerator;
