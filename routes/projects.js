var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
    
var server = new Server('localhost', 3000, {auto_reconnect: true});
db = new Db('projectsdb', server, {safe: true});

db.open(function(err, db) {
    console.log("init mongo open");
    if(!err) {
        console.log("Connected to 'projectsdb' database");
        db.collection('projects', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'projects' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    } else {
    	console.log("Failed to connect... " + err);
    }
});

exports.findAll = function(req, res) {
	console.log('projects/findAll: ');
//    db.collection('wines', function(err, collection) {
//        collection.find().toArray(function(err, items) {
            res.send('projects/findAll :: success');
//        });
//    });
};

exports.addProject = function(req, res) {
    var proj = req.body;
    console.log('Adding project: ' + JSON.stringify(proj));
    db.collection('projects', function(err, collection) {
        collection.insert(proj, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};
