var _ = require("underscore");
var session = require('express-session');

exports.formatProgress = function(locations, progresses) {
  for (var i=0; i < locations.length; i++) {
    var progress = _.findWhere(progresses, {location_id: locations[i].id});
    locations[i].dataValues.visited = progress.visited;
    locations[i].dataValues.progress_id = progress.id;
  }
  return locations
}

//create session
exports.createSession = function(request, response, isUser, callback) {
  console.log("+++ 15 utils.js request.sessionID: ", request.sessionID)
  request.session.regenerate(function() {
    request.session.user = isUser.id
    console.log("+++ 17 utils.js request.sessionID: ", request.sessionID)
    callback(request.session.user, request.sessionID)
  })
}

// Login Checks
var isLoggedIn = function(request) {
  return request.session ? !!request.session.user : false;
}

var isLoggedOut = function(request) {
  return !!(request.session ? !!request.session.user : false);
}

// Reroute based on Auth status
exports.checkUser = function(request, response, next) {
  if (isLoggedIn(request)) {
    next();
  } else {
    response.redirect('/#/login')
  }
}

exports.logout = function (request, response, callback) {
  request.session.destroy();
  request.session = null;
  if(!request.session){
    callback(true);
  }
}
