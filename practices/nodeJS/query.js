var mongo = require('/usr/lib/node_modules/mongodb');
//var mongo = require('mongodb');
var host = '127.0.0.1';
//var port = mongo.Connection.DEFAULT_PORT;
var port = 1337;

function getUser(id, callback) {
    var db = new mongo.Db('nodejs-introduction', new mongo.Server(host, port, {}));
    db.open(function(error) {
        console.log('We are connected ' + host + ':' + port);
        db.collection('user', function(error, collection) {
            console.log('We have the collection');

            collection.find({'id':id.toString()}, function(error, cursor) {
                cursor.toArray(function(error, users){
                    if(users.length == 0) {
                        //console.log('No user found');
                        callback(false);
                    } else {
                        callback(users[0]);
                        //console.log('Found a user ', users[0]);
                    }
                });
            });
        });
    });
}

getUser(1, function(user){
    if(!user) {
        console.log('No user found'); 
    } else {
        console.log('We have a user: ', user); 
    }
});
