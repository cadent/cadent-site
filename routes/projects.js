///// 
// Working EXCEPT on first call to API which fails as the connection is not setup yet
// After first call, connection is set
/////


var connect = require( 'connect' );
var mongo = require( 'mongodb' );

var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGOLAB_URI;
console.log( "start connection " + mongoUri + "  |  " + port );
var database = null;

mongo.connect( mongoUri, {}, dbConnectCallback );


function dbConnectCallback( error, db )
{
    database = db;
	console.log( "Connected to MongoLab" );
    database.addListener( "error", handleError );
   // database.createCollection( "contacts", createCollectionCallback );
};

function handleError( error )
{
    console.log( "Error connecting to MongoLab" );
};


exports.findAll = function(req, res) {
	console.log('projects/findAll: ');
    database.collection('projects', function(err, collection) {
        collection.find({"sort": [['order','asc']]}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addProject = function(req, res) {
    var proj = req.body;
    console.log('Adding project: ' + JSON.stringify(proj));
    database.collection('projects', function(err, collection) {
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

/*
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
    
var server = new Server('localhost', 27017, {auto_reconnect: true});
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
*/
