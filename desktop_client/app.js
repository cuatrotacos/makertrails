angular.module("App", [
  'ui.router',
  'App.login',
  'App.signup',
  'App.logout',
  'App.createMap',
  'App.viewMaps',
  'App.MakerMapController',
  'ngMessages'
  ])
.run(function($rootScope){
  $rootScope.url = 'http://localhost:8000';
  // $rootScope.url = 'https://still-sands-90078.herokuapp.com'
  // $rootScope.url = 'https://makertrails.herokuapp.com'
})
.config(function($stateProvider, $urlRouterProvider, $httpProvider){

  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false
  // });

  $stateProvider
    .state('login',{
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController',
      authenticate: false
    })
    .state('signup',{
      url:'/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupController',
      authenticate: false
    })
    .state('createNewMap',{
      url:'/createNewMap',
      templateUrl: 'templates/createMap.html',
      controller: 'MapController',
      authenticate: true
    })
    .state('viewMaps',{
      url:'/viewMaps',
      templateUrl: 'templates/viewMaps.html',
      controller: 'ViewMapsController',
      authenticate: true
    })
    .state('makerMap', {
      url: '/makerMap/:mapID',
      templateUrl: 'templates/makerMap.html',
      controller: 'MakerMapController',
      params: {
        'mapID': null
      }
    })

  $urlRouterProvider.otherwise('/login');
  $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('makertrails-token');
      if (jwt) {
        object.headers['makertrails-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $state, AppFactory, $window) {
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if (toState.name === "login" && AppFactory.authenticateFunction()) {
      event.preventDefault();
      $state.go('createNewMap');
    }
    if (toState.authenticate && !AppFactory.authenticateFunction()) {
      event.preventDefault();
      $state.go('login');
    }
  });
});
