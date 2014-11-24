'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var NastyGenerator = yeoman.generators.Base.extend({

  prompting: function () {

    var done = this.async();

    var prompts = [{
      name: 'moduleName',
      message: 'What is the module name?',
      validate: function(input) {
        return !!input;
      }
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.angularAppName = this.config.get('app').angularAppName;
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = 'frontend/development/app/' + this.moduleName + '/';
    this.mkdir(folder);
    this.copy('module.js', folder + this.moduleName + '.module.js');
    this.mkdir(folder + 'states');
    this.copy('states.js', folder + '/states/' + this.moduleName + '.states.js');

    var moduleFile = 'frontend/development/app/module.js';
    var module = this.dest.read(moduleFile);
    var mainModuleName = this._.slugify(this.angularAppName);
    module = module.replace("'" + mainModuleName + ".core',", "'" + mainModuleName + ".core',\n  '" + mainModuleName + "." + this.moduleName + "',");

    this.dest.write(moduleFile, module);

  }
});

module.exports = NastyGenerator;
