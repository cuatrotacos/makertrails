angular.module('app.photoFactory', [])
  .factory('Photo', photo);

function photo($http, $q, $ionicPopup) {

  var storeImage = function(locationId, userId, imageData) {
    $http({
        method: 'POST',
        url: ('http://makertrails.herokuapp.com/photos'),
        data: {
          locationId: locationId,
          userId: userId,
          photoData: imageData
        }
      })
      .then(function(photoAdded) {
        console.log("+++ 27 CameraFactory.js photoAdded: ", photoAdded)
        $ionicPopup.alert({
          title: 'Photo added'
        })
      },
      function (err) {
        $ionicPopup.alert({
          title: 'Photo failed you loser'
        })
      }
      )
  };
  return {
    storeImage: storeImage
  }
}









// .factory('Camera', ['$q', function($q) {
//     var getPicture = function(options) {
//       var q = $q.defer();
//       navigator.camera.getPicture(function(result) {
//         q.resolve(result);
//       }, function(err) {
//         q.reject(err);
//       }, options);

//       return q.promise;
//     }

//     var storeImage = function (imageBlob) {

//     }
//   return {
//     getPicture: getPicture
//   }
// }]);
