#!/usr/bin/env node

// (!) This script will OVERWRITE anything in the api/ directory

var fs    = require('fs'),
    apiBaseUrl = '../api/',
    index = fs.readFileSync('./methods.md').toString(),
    template = fs.readFileSync(apiBaseUrl + 'index.html').toString(),
    hyphensToCamelCase;

hyphensToCamelCase = (function(){
    var firstLetter = /-([a-z])/g;

    return function (str){
        return str.replace(firstLetter, function(match, letter){
            return letter.toUpperCase();
        });
    };
}());

function removeArguments (method) {
  return method.split('(')[0];
}

console.log('Building markdown pages for each method in index.md');
console.log('...');


index
  .split('####')
  .slice(1)
  .forEach(function (methodBlock, i) {
    var name, cleanName, des;

    // Clean up trailing headings
    methodBlock = methodBlock.split('##')[0];
    methodBlock = methodBlock.split('###')[0];

    // Get method name and description
    name = methodBlock.split('\n')[0].trim();
    cleanName = hyphensToCamelCase(removeArguments(name));
    desc = methodBlock.split('\n').slice(1).join('\n').trim();
    console.log('making: ' + cleanName);
    if (!fs.existsSync(apiBaseUrl + cleanName)){
      fs.mkdirSync(apiBaseUrl + cleanName);
      fs.writeFileSync(apiBaseUrl + cleanName + '/index.html', template.replace('site.categories.api', 'site.categories.' + cleanName));
    }
  });

console.log('Finished writing to pages to api/ directory.');