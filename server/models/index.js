// Models
var db = require('../db/db.js');
var Promise = require('bluebird');
var _ = require('underscore');

// Sequelize Extras to enable raw SQL
// var seq = require('../db/db.js').seq;


module.exports = {

  mapInfo: {
    get: function (callback) {
      db.Map.findAll()
      .then(function (allMaps) {
        callback(allMaps)
      })
    },
    post: function (newLocations, callback) {
      db.Map.create({
        name: newLocations.mapInfo.name,
        description: newLocations.mapInfo.description,
        user_id: newLocations.mapInfo.user_id
      })
      .then(function (newMap) {
        var newLocationsCreated = [];
        _.each(newLocations.locationsInfo, function (newLocation) {
          db.Location.create({
            map_id: newMap.id,
            lat: newLocation.lat,
            lon: newLocation.lng,
            name: newLocation.name
          })
        })
        Promise.all(newLocationsCreated)
        .then(function () {
          callback(newMap)
        })
      })
    }
  },

  location: {
    get: function (mapId, callback) {
      db.Location.findAll({
        where: {
          map_id: mapId
        }
      })
      .then(function (locations) {
        callback(locations)
      })
    }
  },

  progress: {
    post: function (mapId, locations, userId, callback) {},
    get: function (mapId, locations, userId, callback) {
      db.Progress.findAll({
        where: {
          user_id: userId,
          map_id: mapId
        }
      })
      .then(function (progressLocations) {
        if(progressLocations.length === 0){
          var created = []
          _.each(locations, function (location) {
            created.push(db.Progress.create({
              location_id: location.id,
              user_id: userId,
              map_id: mapId
            }))
          })
          Promise.all(created)
          .then(function (createdProgress) {
            callback(createdProgress)
          })
        } else {
          callback(progressLocations)
        }
      })
    },
    put: function (progressId, callback) {
      db.Progress.find({
        where: {
          id: progressId
        }
      })
      .then(function (locationCollided){
        if(locationCollided.visited === false){
          locationCollided.visited = true;
          locationCollided.save()
          callback(true)
        } else{
          callback(false)
        };
      })
    }
  },

  review: {
    get: function(locationId, callback){
      db.Review.findAll({
        where: {
          location_id: locationId
        }
      }).then(function(reviews){
        var queries = [];
        _.each(reviews, function(review){
          queries.push(db.User.findById(review.user_id).then(function(user){
            review.dataValues.author = user.name;
          }));
        })
        Promise.all(queries)
        .then(function(){
          callback(reviews);
        })
      })
    },
    post: function(review, callback){
      console.log("+++line 122 what is the review", review)
      db.Review.create({
        location_id: review.location_id,
        user_id: review.user_id,
        body: review.body,
        rating: review.rating
      }).then(function(postedReview){
        callback(postedReview);
      }).catch(function(error){
        console.log("+++line 131 models posting review failed")
        console.log(error)
      })
    }
  },

  login: {
    post: function (username, password, callback) {
      db.User.find({
        where: {
          name: username
        }
      })
      .then(function (found)  {
        if (found && found.password === password) {
          callback(found)
        } else {
          callback(false)
        }
      })
    }
  },

  signup: {
    post: function (username, password, email, callback) {
      db.User.findOrCreate({
        where: {
          $or:[{name: username}, {email: email}]
        }
      })
      .spread(function (found, create) {
        if (create) {
          found.name = username;
          found.password = password;
          found.email = email;
          found.save();
          callback(found);
        }else{
          callback(false);
        }
      })
    }
  }

}




// var request = require('request');
// var parser = require('body-parser');
// // var bcrypt = require('bcrypt-nodejs');

// // Database Requirements
// var mysql = require('mysql');
