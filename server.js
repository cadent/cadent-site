var express = require('express'),
    path = require('path'),
    http = require('http'),
    project = require('./routes/projects'),
    tag = require('./routes/tags');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/projects', tag.findAll);
app.post('/projects', tag.addTag);

app.get('/tags', project.findAll);
app.post('/tags', project.addProject);

console.log("Server hit - " + app.get('port'));
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});


/*
var connect = require('connect'),
  mongo = require('mongodb');
 
// Connect to a mongo database via URI
// With the MongoLab addon the MONGOLAB_URI config variable is added to your
// Heroku environment.  It can be accessed as process.env.MONGOLAB_URI
mongo.connect(process.env.MONGOLAB_URI, {}, function(error, db){
 
  // console.log will write to the heroku log which can be accessed via the 
  // command line as "heroku logs"
  db.addListener("error", function(error){
    console.log("Error connecting to MongoLab");
  });
  
  db.createCollection('requests', function(err, collection){
    db.collection('requests', function(err, collection){
      var requestCollection = collection;
      connect(
        connect.favicon(),                    // Return generic favicon
        connect.query(),                      // populate req.query with query parameters
        connect.bodyParser(),                 // Get JSON data from body
        function(req, res, next){             // Handle the request
          res.setHeader("Content-Type", "application/json");
          if(req.query != null) {
            requestCollection.insert(req.query, function(error, result){
              // result will have the object written to the db so let's just
              // write it back out to the browser
              res.write(JSON.stringify(result));
            });
          }
          
          res.end();
        }
      ).listen(process.env.PORT || 8080);
      // the PORT variable will be assigned by Heroku
    });
  });
});
*/