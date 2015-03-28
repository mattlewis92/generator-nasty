'use strict';
var util = require('../util');
var yeoman = require('yeoman-generator');


var NastyGenerator = yeoman.generators.Base.extend({

  prompting: function () {

    var done = this.async();

    var prompts = [{
      name: 'routePrefix',
      message: 'What is the prefix of the route? e.g. /api/v1/user',
      validate: function(input) {
        return !!input;
      }
    }, {
      name: 'actionPath',
      message: 'What is the action path of the route? e.g. /update',
      validate: function(input) {
        return !!input;
      }
    }, {
      name: 'actionName',
      message: 'What is the action name? e.g. updateUser',
      validate: function(input) {
        return !!input;
      }
    }, {
      name: 'httpMethod',
      message: 'What is the HTTP method?',
      type: 'list',
      choices: [
        'get',
        'post',
        'put',
        'delete'
      ]
    }, {
      name: 'apiDescription',
      message: 'What is the description of the route?',
      validate: function(input) {
        return !!input;
      }
    }, {
      name: 'submodule',
      message: 'If a submodule, what is it? (Or just leave blank)'
    }];

    this.prompt(prompts, function (props) {
      for (var key in props) {
        this[key] = props[key];
      }
      this.apiName = util.capitaliseFirstLetter(props.actionName);
      this.apiGroup = util.capitaliseFirstLetter(props.routePrefix.split('/').pop());
      done();
    }.bind(this));

  },

  writing: function () {

    var folder = 'backend/routes' + this.routePrefix;
    if (this.submodule) {
      folder += '/submodules/' + this.submodule;
    }
    var actionFolder = folder + '/actions';
    var appJsFile = folder + '/app.js';
    this.mkdir(actionFolder);
    this.copy('action.js', actionFolder + '/' + this.actionName + '.js');

    try {
      var appJs = this.dest.read(appJsFile);
      //app.js exists, so update it
      var newLine = "app." + this.httpMethod + "('" + this.actionPath + "', actions." + this.actionName + ");\n  app.";
      appJs = appJs.replace('app.', newLine);
      this.dest.write(appJsFile, appJs);
    } catch (e) {
      //app.js doesnt exist, so make it
      this.copy('app.js', appJsFile);
    }

  }

});

module.exports = NastyGenerator;
