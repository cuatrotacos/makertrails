angular.module('app.HomeController', [])

.controller('HomeController', homeController);

function homeController($scope, $state, $cordovaCamera, Photo) {
  $scope.goToMapList = function() {
    $state.go('selectMap');
  };

    $scope.takePicture = function() {
        var options = {
            quality : 100,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            Photo.storeImage(1, 1, $scope.imgURI)
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
}
