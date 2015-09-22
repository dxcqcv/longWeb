var http = require('http');
var options = {
    host: 'http://10.20.1.98',
    port: 8080,
    path: '/rems/rest/gislist.json',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        //'Content-Length': postData.length
    }
}; 

var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log('BODY: ' + chunk);
    });
    res.on('end', function() {
        console.log('No more data in response.');
    });
});
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    //req.write(postData);
    req.end();
