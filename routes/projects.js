var connect = require( 'connect' );
var mongo = require( 'mongodb' );

var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGOLAB_URI;
var database = null;

mongo.connect( mongoUri, {}, dbConnectCallback );

function dbConnectCallback( error, db )
{
    database = db;
    database.addListener( "error", handleError );
};

function handleError( error )
{
    console.log( "Error connecting to MongoLab" );
};

exports.findAll = function(req, res) {
	console.log('projects/findAll: ');
    database.collection('projects', function(err, collection) {
        collection.find().sort({order: 1}).toArray(function(err, items) {
            res.send(items);
        });
    });
};
/*
exports.addProject = function(req, res) {
    var proj = req.body;
    database.collection('projects', function(err, collection) {
        collection.insert(proj, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(result[0]);
            }
        });
    });
};
*/