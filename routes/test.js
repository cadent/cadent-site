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
   // database.createCollection( "contacts", createCollectionCallback );
};

function handleError( error )
{
    console.log( "Error connecting to MongoLab" );
};

exports.testIt = function(req, res) {
	console.log('test/testIt: ');
//    db.collection('wines', function(err, collection) {
//        collection.find().toArray(function(err, items) {
            res.send('test/testIt :: success');
//        });
//    });
};