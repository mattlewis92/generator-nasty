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
      name: 'serviceName',
      message: 'What is the service name?',
      validate: function(input) {
        return !!input;
      }
    }, {
      name: 'serviceType',
      message: 'What is the type of service?',
      type: 'list',
      choices: [
        'factory',
        'service',
        'provider'
      ]
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.serviceName = props.serviceName;
      this.serviceType = props.serviceType;
      this.angularAppName = this.config.get('app').angularAppName;
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = util.getFrontendFolder(this.config) + '/' + this.moduleName + '/services/';
    this.mkdir(folder);
    this.copy(this.serviceType + '.js', folder + this.moduleName + '.' + this.serviceName + '.' + this.serviceType + '.js');

  }
});

module.exports = NastyGenerator;
