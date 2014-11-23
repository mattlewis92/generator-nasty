'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var NastyGenerator = yeoman.generators.Base.extend({

  prompting: function () {

    var done = this.async();

    var prompts = [{
      name: 'namespace',
      message: 'What is the namespace of the worker?'
    },{
      name: 'workerName',
      message: 'What is the worker name?'
    },{
      name: 'workerFrequency',
      message: 'What frequency should the worker run at?'
    }];

    this.prompt(prompts, function (props) {
      this.namespace = props.namespace;
      this.workerName = props.workerName;
      this.workerFrequency = props.workerFrequency;
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = 'backend/workers/' + this.namespace;
    this.mkdir(folder);
    this.copy('worker.js', folder + '/' + this.workerName + '.js');

  }
});

module.exports = NastyGenerator;
