//ROOT APP
angular.module('app', [
  'ionic',
  'app.routes',
  'app.CollisionFactory',
  'app.MakerMapController',
  'app.MakerMapFactory',
  'app.LoginController',
  'app.LoginFactory',
  'app.SignupController',
  'app.HomeController',
  'app.SelectMapController'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.run(function($rootScope, $state, AuthService, AUTH_EVENTS){

  $rootScope.$on('$stateChangesStart' , function(event, next, nextParams, fromState) {

    if('data' in next && 'authorizedRoles' in next.data){
      var authorizedRoles = next.data.authorizedRoles;
      if(!AuthService.isAuthorized(authorizedRoles)){
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }
    if(!AuthService.isAuthenticated()){
      if(next.name !== 'login'){
        event.preventDefault();
        $state.go('login');
      }
    }
  });
})