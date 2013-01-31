var express = require('express'),
    path = require('path'),
    http = require('http'),
    project = require('./routes/projects');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/projects', project.findAll);
//app.post('/projects', project.addProject);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});