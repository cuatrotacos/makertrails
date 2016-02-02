// Models
var db = require('../db/db.js');
var Promise = require('bluebird');
var _ = require('underscore');

module.exports = {

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
      db.Review.create({
        location_id: review.location_id,
        user_id: review.user_id,
        body: review.body,
        rating: review.rating
      }).then(function(postedReview){
        callback(postedReview);
      })
    }
  }

  // photo: {
  //   get: function(){},
  //   post: function(){}
  // }
}
