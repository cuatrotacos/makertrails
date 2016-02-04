var models = require('../models');
var utils = require('../helpers/utils.js');

module.exports = {

  mapInfo: {
    get: function (request, response) {
      models.mapInfo.get(function (allMaps) {
        response.json({ allMaps });
      })
    },
    post: function (request, response) {
      var newLocations = request.body;
      newLocations.mapInfo.user_id = request.session.user
      models.mapInfo.post(newLocations, function (newMap) {
        models.location.get(newMap.dataValues.id, function (locations) {
          response.json({ locations });
        })
      })
    }
  },

  location: {
    get: function (request, response){
     var mapId = request.query.mapId;
     models.location.get(mapId, function (locations) {
        response.json({ locations });
     })
    }
  },

  progress: {
    get: function (request, response) {
      var mapId = request.query.mapId;
      var userId = request.session.user;
      models.location.get(mapId, function (locations) {
        models.progress.get(mapId, locations, userId, function (progresses) {
          var formattedProgress = utils.formatProgress(locations, progresses);
          response.status(200).send(formattedProgress);
        })
      })
    },
    put: function (request, response) {
      var progressId = request.body.progressId;
      models.progress.put(progressId, function (result) {
        if(result){
          response.sendStatus(200)
        }else{
          response.sendStatus(400)
        };
      })
    }
  },

  review: {
    get: function(request, response){
      var locationId = request.query.locationId;
      models.review.get(locationId, function(reviews){
        response.json({reviews})
      });
    },
    post: function(request, response) {
      var review = request.body;
      review.user_id = request.session.user;
      models.review.post(review, function(postedReview){
        response.status(200).send(postedReview);
      })
    }
  },

  login: {
    get: function (request, response) {},
    post: function (request, response) {
      var username = request.body.username; //stringify because chris
      var password = request.body.password;// need to bcrypt
      models.login.post(username, password, function (isUser) {
        // response.redirect('/app') // PROBABLY GOOD IDEA TO REDIRECT TO ROUTE APP (HOW?)
        if (isUser) {
          utils.createSession(request, response, isUser, function (newUser, sessionID) {
           response.status(200).json( {
             'sessionID': sessionID,
             "userID": newUser
            } );
          })
        }else{
         response.sendStatus(400);
        };
      })
    }
  },

  signup: {
    post: function (request, response) {
      var username = request.body.username;
      var password = request.body.password; // need to bcrypt
      var email = request.body.email;
      models.signup.post(username, password, email, function (isUser) {
        if(isUser){
          response.status(200).json(isUser);
        }else{
          response.sendStatus(400);
        };
      })
    }
  },

  logout:{
    get: function (request, response, callback) {
      utils.logout(request, response, function (loggedOut){
        response.sendStatus(200)
      })
    }
  }
}
