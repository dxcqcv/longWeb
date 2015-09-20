var fs = require('fs');
console.log('Starting');
var content = fs.readFileSync('./files/sample.txt') 
console.log('Contents: ' + content);
console.log('Carry on executing');
