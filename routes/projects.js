var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
    
var server = new Server('localhost', process.env.MONGOLAB_URI, {auto_reconnect: true});
db = new Db('projectsdb', server, {safe: true});

db.open(function(err, db) {
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
	console.log('projects/addProject: ');
//    db.collection('wines', function(err, collection) {
//        collection.find().toArray(function(err, items) {
            res.send('projects/addProject :: success');
//        });
//    });
};
