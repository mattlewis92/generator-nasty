'use strict';

module.exports = function(worker, services, debug) {

  worker<% if (workerFrequency) { %>
    .frequency('<%= workerFrequency %>')<% } %>
    .action(function(job, done) {
      debug('Hello world!');
      done();
    });

};
