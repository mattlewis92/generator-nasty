'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var NastyGenerator = yeoman.generators.Base.extend({

  prompting: function () {

    var done = this.async();

    var prompts = [{
      name: 'namespace',
      message: 'What is the namespace of the command?',
      validate: function(input) {
        return !!input;
      }
    },{
      name: 'commandName',
      message: 'What is the command name?',
      validate: function(input) {
        return !!input;
      }
    },{
      name: 'commandDescription',
      message: 'Your command description please?',
      validate: function(input) {
        return !!input;
      }
    }];

    this.prompt(prompts, function (props) {
      this.namespace = props.namespace;
      this.commandName = props.commandName;
      this.commandDescription = props.commandDescription;
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = 'backend/commands/' + this.namespace;
    this.mkdir(folder);
    this.copy('command.js', folder + '/' + this.commandName + '.js');

  }
});

module.exports = NastyGenerator;
