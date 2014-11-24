var fs = require('fs');

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFrontendModuleList(basePath) {

  var directory = basePath + '/frontend/development/app';
  var modules = [];
  fs.readdirSync(directory).forEach(function(folder) {
    var stat = fs.statSync(directory + '/' + folder);

    if (stat.isDirectory() && folder.indexOf('.') !== 0) {
      modules.push(folder);
    }
  });

  return modules;

}

module.exports.capitaliseFirstLetter = capitaliseFirstLetter;
module.exports.getFrontendModuleList = getFrontendModuleList;
