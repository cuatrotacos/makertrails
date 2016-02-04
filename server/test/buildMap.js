var db = require('../db/db.js');
var _ = require('underscore');
var Promise = require('bluebird');

exports.buildMap = function(){
  db.User.find({
    name: "Pato"
  }).then(function (found) {
    if (!found){
      db.User.create({
        name: "Pato",
        password: "password",
        email: "duck@taco.com"
      }).then(function(user){
        db.Map.create({
          user_id: user.id,
          name: "First Map",
          description: "This is our first map ever."
        }).then(function(map){
          var locations = [
            {
              name: "library",
              map_id: map.id,
              lat: 34.0185964,
              lon: -118.4935023
            },
            {
              map_id: map.id,
              name: "Sweat Yoga",
              lat: 34.020135,
              lon: -118.493522
            },
            {
              map_id: map.id,
              name: "Wendy's",
              lat: 34.019816,
              lon: -118.492200
            }
          ];
          var queried = [];
          _.each(locations, function(location){
            queried.push(db.Location.create(
              location
            ));
          });
          Promise.all(queried).then(function(createdLocations){
            _.each(createdLocations, function (createdLocation) {
              db.Progress.create({
                location_id: createdLocation.id,
                user_id: user.id,
                map_id: map.id
              });
            });
          });
        });
      });

    }
  })
};
