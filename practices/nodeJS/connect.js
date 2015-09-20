var mongo = require('/usr/lib/node_modules/mongodb');
//var mongo = require('mongodb');
var host = '127.0.0.1';
//var port = mongo.Connection.DEFAULT_PORT;
var port = 1337;
var db = new mongo.Db('nodejs-introduction', new mongo.Server(host, port, {}));
db.open(function(error) {
    console.log('We are connected ' + host + ':' + port);
    db.collection('user', function(error, collection) {
        console.log('We have the collection');

        collection.insert({
            id:'1',
            name: 'Roy'
        }, function() {
            console.log('Successfully inseted Roy')
        });

        collection.insert({
            id:'2',
            name: 'Kidy'
        }, function() {
            console.log('Successfully inseted Kidy')
        });
    });
});
