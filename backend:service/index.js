'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var NastyGenerator = yeoman.generators.Base.extend({

  prompting: function () {

    var done = this.async();

    var prompts = [{
      name: 'namespace',
      message: 'What is the namespace of the service?',
      validate: function(input) {
        return !!input;
      }
    },{
      name: 'serviceName',
      message: 'What is the service name?',
      validate: function(input) {
        return !!input;
      }
    }];

    this.prompt(prompts, function (props) {
      this.namespace = props.namespace;
      this.serviceName = props.serviceName;
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = 'backend/services/' + this.namespace;
    this.mkdir(folder);
    this.copy('service.js', folder + '/' + this.serviceName + '.js');

  }
});

module.exports = NastyGenerator;
