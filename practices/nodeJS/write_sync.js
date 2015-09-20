var fs = require('fs');
console.log('Starting');
//fs.writeFileSync('./files/write_sync.txt','Hello world! Synchronous!');
fs.writeFile('./files/write_sync.txt','Hello world! Synchronous!', function(error) {
    console.log('written file');
});
console.log('Finished!');
