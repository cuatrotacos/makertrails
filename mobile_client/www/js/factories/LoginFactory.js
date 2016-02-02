angular.module('app.LoginFactory', [])
.factory('LoginFactory', function($q, $http, USER_ROLES){
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials(){
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if(token){
      userCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token){
      userCredentials(token);
    }
  }

  function userCredentials(token){
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;

    if(username == 'admin'){
      role = USER_ROLES.admin
    }
    if(username == 'user'){
      role = USER_ROLES.public
    }

    $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  var login = function(name, password){
    return $q(function(resolve, reject){
      if((name == 'admin' && password === '1') || (name == 'user' && password == '1')) {
        storeUserCredentials(name + '.yourServerToken');
        resolve('Login Sucess');
      }else{
        reject('Login Failed');
      }
    });
  };

  var logout = function(){
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles){
    if(!angular.isArray(authorizedRoles)){
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function(){return isAuthenticated;},
    username: function(){return username;},
    role: function(){return role;}
  };
})

.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS){
  return {
    responseError: function(response){
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});