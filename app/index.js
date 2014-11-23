'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var NastyGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async(), slugify = this._.slugify;

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the majestic Nasty generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'Your application name please?'
    },{
      name: 'angularAppName',
      message: 'Your angular application name please?',
      default: function(answers) {
        return slugify(answers.appName);
      }
    },{
      name: 'appDescription',
      message: 'Your application description please?'
    },{
      name: 'hasFrontend',
      message: 'Does the app have a frontend or is it just a REST API?',
      type: 'confirm',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.angularAppName = props.angularAppName;
      this.appDescription = props.appDescription;
      this.hasFrontend = props.hasFrontend;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      this.mkdir('logs');
      this.copy('package.json', 'package.json');
      this.copy('gulpfile.js', 'gulpfile.js');
      this.copy('cli', 'cli');
      this.copy('pm2.json', 'pm2.json');

      this.directory('backend', 'backend');

      if (this.hasFrontend) {
        this.copy('.bowerrc', '.bowerrc');
        this.copy('bower.json', 'bower.json');
        this.directory('frontend', 'frontend');
      }

    },

    projectfiles: function () {
      this.copy('.editorconfig', '.editorconfig');
      this.copy('.gitignore', '.gitignore');
      this.copy('.htmlhintrc', '.htmlhintrc');
      this.copy('.jscsrc', '.jscsrc');
      this.copy('.uncssignore', '.uncssignore');
      this.copy('README.md', 'README.md');
    }
  },

  installingFailingModules: function() {
    var done = this.async();
    this.npmInstall(['mmmagic'], done);
  },

  end: function () {
    var log = this.log;
    this.installDependencies(function() {
      log('All done! Now you can start your app by running gulp');
    });
  }
});

module.exports = NastyGenerator;
