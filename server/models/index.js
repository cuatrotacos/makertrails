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
        callback(allMaps);
      });
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
          console.log('newLocation in DB ', newLocation);
          db.Location.create({
            map_id: newMap.id,
            lat: newLocation.lat,
            lon: newLocation.lng,
            name: newLocation.name,
            msg: newLocation.msg,
            radius: newLocation.radius
          });
        });
        Promise.all(newLocationsCreated)
        .then(function () {
          callback(newMap);
        });
      });
    },
    delete: function(mapId, callback) {
      db.Map.findById(mapId)
      .then(function(map) {
      map.destroy();
         callback();
      });
    }
  },

  userMaps: {
    get: function (userId, callback) {
      // var userMaps = [];
      db.Map.findAll({
          where: {
            user_id: userId
          }
      })
      .then(function (userMaps) {
        // console.log("this is the first userMaps in models index.js", userMaps);
        // var uniqueMapIds = [];
        // var mapInfo = [];
        // _.each(userMaps, function (eachMap) {
        //   uniqueMapIds.push(eachMap.dataValues.map_id)
        // })
        // uniqueMapIds = _.uniq(uniqueMapIds);
        // _.each(uniqueMapIds, function (uniqueMapId) {
        //   mapInfo.push(db.Map.findById(uniqueMapId))
        // })
        // Promise.all(mapInfo)
        // .then(function () {
        //   console.log("this is userMaps in models index.js", userMaps);
        //   callback(mapInfo);
        // })

        var mapInfo = [];
        _.each(userMaps, function(singleMap){
          mapInfo.push(db.Location.findAll({
            where: {
              map_id: singleMap.id
            }
          }));
        });
        Promise.all(mapInfo)
        .then(function () {
          _.each(userMaps, function(singleMap, id){
           // console.log(mapInfo[id]);
            singleMap.dataValues.locations = mapInfo[id];
          });
        //  console.log("this is userMaps in models index.js", userMaps);
          callback(userMaps);
        });
      });
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
      });
    }
  },

  progress: {
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
    // get: function(locationId, mapId, callback){
    //   db.Location.find(
    //     {attributes: ["map_id"],
    //     where: {id: locationId}
    //   })
    //   .then(function(mapId){
    //     db.Map.findById(mapId.map_id)
    //     .then(function(mapInfo){
    //       db.Review.findAll({
    //         where: {
    //           location_id: locationId
    //         }
    //       }).then(function(reviews){
    //         var queries = [];
    //         _.each(reviews, function(review){
    //           queries.push(db.User.findById(review.user_id).then(function(user){
    //             review.dataValues.author = user.name;
    //           }));
    //         })
    //         Promise.all(queries)
    //         .then(function(){
    //           callback({"mapInfo": mapInfo, "reviews": reviews});
    //         })
    //       })
    //     })
    //   })
    // },
    get: function (locationId, callback) {
      db.Review.findAll({
        where: {
          location_id: locationId
        }
      })
      .then(function (locationReviews) {
         var queries = [];
            _.each(locationReviews, function(review){
              queries.push(db.User.findById(review.user_id).then(function(user){
                review.dataValues.author = user.name;
              }));
            })
            Promise.all(queries)
            .then(function(){
              // callback(locationReviews)
            //  console.log("+++ 171 index.js queries: ", queries)
            //  console.log("+++ 173 index.js locationReviews: ", locationReviews)
              callback(locationReviews);
            })
      },
      function (err) {
        console.log("+++ 165 index.js err: ", err)
      })
    },
    post: function(review, locationId, userId, rating, callback){
      db.Review.create({
        location_id: locationId,
        body: review,
        user_id: userId,
        rating: rating
      }).then(function(postedReview){
        callback(postedReview);
      }).catch(function(error){
       // console.log("+++ 178 index.js Review failed to post to db")
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
  },

  photos: {
    post: function (locationId, userId, photoData, callback) {
      db.Photo.create({
        location_id: locationId,
        user_id: userId,
        link: photoData
      })
      .then(function (photoAdded) {
        callback(photoAdded)
      })
    },
    get: function (locationId, callback) {
      db.Photo.findAll({
        where: {
          location_id: locationId
        }
      })
      .then(function (locationPhotos) {
        callback(locationPhotos)
      })
    }
  }

}




// var request = require('request');
// var parser = require('body-parser');
// // var bcrypt = require('bcrypt-nodejs');

// // Database Requirements
// var mysql = require('mysql');
