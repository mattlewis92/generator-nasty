'use strict';

module.exports = function(program, services, suggestedName) {

  program
    .command(suggestedName)
    .description('<%= commandDescription %>')
    .action(function() {

    });

};
