var _ = require("underscore");
var session = require('express-session');
var jwt  = require('jwt-simple');

exports.formatProgress = function(locations, progresses) {
  for (var i=0; i < locations.length; i++) {
    var progress = _.findWhere(progresses, {location_id: locations[i].id});
    locations[i].dataValues.visited = progress.visited;
    locations[i].dataValues.progress_id = progress.id;
  }
  return locations
}

var decodeToken = exports.decodeToken = function(request){
  return jwt.decode(request.headers['makertrails-token'], 'magic-words');
}

//create token
exports.createToken = function(request, response, isUser, callback) {
  var token = jwt.encode({"userId": isUser.id, "username": isUser.name}, 'magic-words');
  callback(token, isUser.name);
}

// Login Checks
var isLoggedIn = function(token) {
  var hash = jwt.decode(token, 'magic-words');
  console.log("+++line 27 magic hash", hash);
  return !!hash.userId;
}

// Reroute based on Auth status
exports.checkUser = function(request, response, next) {
  var token = request.headers['makertrails-token'];
  if (!token || (token === "undefined")){
    response.status(401).send("No token detected")
  } else {
    if (isLoggedIn(token)){
      next()
    } else {
      response.sendStatus(401);
    }
  }
}
