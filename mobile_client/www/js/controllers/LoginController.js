angular.module('app.LoginController', [])

.controller('LoginController', function($scope, $location, LoginFactory, $state, $ionicPopup) {
      $scope.login = function(){
      LoginFactory.login($scope.username, $scope.password)
    }
    // $scope.data = {};
 
    // $scope.login = function() {
    //     LoginFactory.loginUser($scope.data.username, $scope.data.password).success(function(data) {
    //       $state.go('/makerMap');
    //       }).error(function(data) {
    //         var alertPopup = $ionicPopup.alert({
    //           title: 'Login Failed',
    //           template: 'Please check your credentials'
    //         });
    //       });
    //     console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    //     $location.url('/makerMap');
    //   }
    })