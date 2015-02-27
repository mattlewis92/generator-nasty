var fs = require('fs');

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFrontendModuleList(basePath, config) {

  var directory = basePath + '/' + getFrontendFolder(config);
  var modules = [];
  fs.readdirSync(directory).forEach(function(folder) {
    var stat = fs.statSync(directory + '/' + folder);

    if (stat.isDirectory() && folder.indexOf('.') !== 0) {
      modules.push(folder);
    }
  });

  return modules;

}

function getFrontendFolder(config) {
  return config.get('app').frontendFolder || 'frontend/development/app';
}

function replaceNthLastOccurenceOf(n, str, find, replace) {
  var pos = str.lastIndexOf(find);
  for (var i = 1; i < n; i++) {
    pos = str.lastIndexOf(find, pos - 1);
  }
  return str.slice(0, pos) + str.slice(pos).replace(find, replace);
}

module.exports.capitaliseFirstLetter = capitaliseFirstLetter;
module.exports.getFrontendModuleList = getFrontendModuleList;
module.exports.getFrontendFolder = getFrontendFolder;
module.exports.replaceNthLastOccurenceOf = replaceNthLastOccurenceOf;
