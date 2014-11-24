'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var NastyGenerator = yeoman.generators.Base.extend({

  prompting: function () {

    var done = this.async();

    var prompts = [{
      name: 'moduleName',
      message: 'What is the module name?'
    }, {
      name: 'filterName',
      message: 'What is the filter name?'
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.filterName = props.filterName;
      this.angularAppName = this.config.get('app').angularAppName;
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = 'frontend/development/app/' + this.moduleName + '/filters/';
    this.mkdir(folder);
    this.copy('filter.js', folder + this.moduleName + '.' + this.filterName + '.filter.js');

  }
});

module.exports = NastyGenerator;
