var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./files/config.json'));
var host = config.host;
var port = config.port;
var express = require('/usr/lib/node_modules/express');

var app = express();

//app.use(app.router); // deprecated
//app.use(express.static(__dirname + "/public"));

app.get('/', function(request, response){
    response.send('hello world!');
});
app.get("/hello/:text", function(request, responese){
    response.send("Hello " + request.params.text);
});

app.listen(port, host);

//var users = {
    //'1' : {
        //"name" : 'Jeffrey Way',
        //'twitter' : 'jeffrey_way'
    //},
    //'2' : {
        //"name": 'Ollie Parsley',
        //'twitter' : 'ollieparsley'
    //}
//}

//app.get("/usr/:id", function(request, response){
    //var user = users[request.params.id];
    //if(user) {
        //response.send('<a href="http://twitter.com' + user.twitter + '">Follow ' + user.name + 'on twitter</a>');
    //} else {
        //response.send('Sorry! We cannot find the user :(', 404);
    //}
//});
