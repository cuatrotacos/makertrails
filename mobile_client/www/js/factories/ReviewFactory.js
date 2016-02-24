angular.module('app.ReviewFactory', [])
  .factory('Reviews', reviews);

function reviews($http, $ionicPopup) {

  var url;
  // url = 'http://localhost:8000';
  // url = 'http://still-sands-90078.herokuapp.com'
  url = 'https://makertrails.herokuapp.com'

  var submitReview = function (review, locationId, userId, rating) {
    console.log('inside Reviews.submitReview');
    return $http({
      method: 'POST',
      url: url + '/review',
      data: {
        review: review,
        locationId: locationId,
        userId: userId,
        rating: rating
      }
    })
    .then(function (success) {
      console.log("+++ 20 ReviewFactory.js rejoice")
    })
  }

  var retrieveReviews = function (locationId, mapId) {
    return $http({
      method: 'GET',
      url: url + '/review?locationId=' + locationId
    })
    .then(function (locationReviews) {
    return locationReviews
    },
    function (err) {
      $ionicPopup.alert({
        title: 'Reviews didnt load narf!'
      })
    }
    )

  };

  return {
    submitReview: submitReview,
    retrieveReviews: retrieveReviews
  }
}
