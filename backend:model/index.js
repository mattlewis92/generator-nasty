'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var NastyGenerator = yeoman.generators.Base.extend({

  prompting: function () {

    var done = this.async();

    var prompts = [{
      name: 'modelName',
      message: 'What is the name of the model?'
    }, {
      name: 'isTimestampable',
      message: 'Is the model timestampable?',
      type: 'confirm',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.modelName = props.modelName;
      this.isTimestampable = props.isTimestampable;
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = 'backend/services/app/models/' + this.modelName + '/';
    this.mkdir(folder);
    this.copy('methods.js', folder + '/methods.js');
    this.copy('schema.js', folder + '/schema.js');
    if (this.isTimestampable) {
      this.copy('plugins.js', folder + '/plugins.js');
    }

  }
});

module.exports = NastyGenerator;
