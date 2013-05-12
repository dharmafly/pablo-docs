#!/usr/bin/env node

// (!) This script will OVERWRITE anything in the api/ direcoty

var fs    = require('fs'),
    apiBaseUrl = '../../api/',
    index = fs.readFileSync('./methods.md').toString(),
    hyphensToCamelCase;

hyphensToCamelCase = (function(){
    var firstLetter = /-([a-z])/g;

    return function (str){
        return str.replace(firstLetter, function(match, letter){
            return letter.toUpperCase();
        });
    };
}());

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
    fs.writeFileSync('api/' + pad(i + 2, 3) + '. ' + cleanName + '.md',
                      page(name, desc));
  });

console.log('Finished writing to pages to api/ directory.');


function removeArguments (method) {
  return method.split('(')[0];
}

function page (name, desc) {
  return '---\n' +
         'category: api\n' +
         '---\n\n' + 
         '## ' + name + '\n\n' + desc;
}

function pad(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test( number ) ? 2 : 1)).join( '0' ) + number;
  }
  return number + "";
}