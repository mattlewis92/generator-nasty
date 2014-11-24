'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var NastyGenerator = yeoman.generators.Base.extend({

  prompting: function () {

    var done = this.async();

    var prompts = [{
      name: 'folder',
      message: 'What folder should the middleware be placed in?',
      validate: function(input) {
        return !!input;
      }
    }, {
      name: 'middlewareName',
      message: 'What is the name of the middleware?',
      validate: function(input) {
        return !!input;
      }
    }];

    this.prompt(prompts, function (props) {
      this.folder = props.folder;
      this.middlewareName = props.middlewareName;
      done();
    }.bind(this));

  },

  writing: function () {
    var folder = 'backend/routes/' + this.folder + '/middleware';
    this.mkdir(folder);
    this.copy('middleware.js', folder + '/' + this.middlewareName + '.js');
  }

});

module.exports = NastyGenerator;
