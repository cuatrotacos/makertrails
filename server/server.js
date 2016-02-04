var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var path = require('path');

//Middleware
var parser = require('body-parser');
var router = require(__dirname + '/routes/routes.js');

// Router
var app = express();
module.exports.app = app;

// Establish session
app.use(session({
 secret: 'dgdjkgd34',
 resave: true,
 saveUninitialized: false,
 cookie: {maxAge: 1000*60*60}
}));

// Set what we are listening on.
app.set("port", process.env.PORT || 8000);

// Logging and parsing
app.use(parser.json());

//Use cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Serving static files from client directory.
app.use(express.static(__dirname + '../desktop_client'));
app.use('/',  express.static(path.join(__dirname, '../desktop_client/')));
// Set up our routes
app.use("/", router);

app.listen(app.get("port"));
console.log("Listening on", app.get("port"));
