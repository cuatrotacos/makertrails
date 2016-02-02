angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupController'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeController'
    })
    .state('makerMap', {
      url: '/makerMap',
      templateUrl: 'templates/makerMap.html',
      controller: 'MakerMapController'
    })
    .state('selectMap', {
      url: '/selectMap',
      templateUrl: 'templates/selectMap.html',
      controller: 'SelectMapController'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});