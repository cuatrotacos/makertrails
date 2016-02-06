var models = require('../models');
var utils = require('../helpers/utils.js');

var controllers;
module.exports = controllers = {

  mapInfo: {
    get: function (request, response) {
      models.mapInfo.get(function (allMaps) {
        response.json({ allMaps });
      })
    },
    post: function (request, response) {
      var newLocations = request.body;
      newLocations.mapInfo.user_id = utils.decodeToken(request).userId;
      models.mapInfo.post(newLocations, function (newMap) {
        models.location.get(newMap.dataValues.id, function (locations) {
          response.json({ locations });
        })
      })
    }
  },

  userMaps: {
    get: function (request, response) {
      var userId = request.session.user;
      models.userMaps.get(userId, function (userMaps) {
        response.json( userMaps )
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
      var userId = utils.decodeToken(request).userId;
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
      review.user_id = utils.decodeToken(request).userId;
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
          utils.createToken(request, response, isUser, function (token, name) {
           response.status(200).send( {
             'username': name,
             'makertrails-token': token
           });
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
          utils.createToken(request, response, isUser, function (token, name) {
           response.status(200).json( {
             "username": name,
             'makertrails-token': sessionID
            } );
          })
        }else{
          response.sendStatus(400);
        };
      })
    }
  },

  photos: {
    post: function (request, response, callback) {
      var locationId = request.body.locationId;
      var userId = request.body.userId;
      var photoData = request.body.photoData;
      models.photos.post(locationId, userId, photoData, function (photoAdded){
        response.json(photoAdded)
      })
    }
  }
}
