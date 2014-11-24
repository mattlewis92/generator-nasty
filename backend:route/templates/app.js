'use strict';

module.exports = function(app, actions) {

  app.<%= httpMethod %>('<%= actionPath %>', actions.<%= actionName %>);

};
