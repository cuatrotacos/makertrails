angular.module('app.LoginFactory', [])
.factory('LoginFactory', function($http, $state){
    var login = function(username, password){
      return $http ({
        method: 'POST',
        url: 'http://makertrails.herokuapp.com/login',
        data: {
          username: username,
          password: password
        }
      })
      .then(function(success){
        $state.go('/makerMap') // THIS WILL REDIRECT TO HOME
      }, function(err){
        console.log(err);
      })
    };
    var signup = function(username, password, email){
      return $http ({
        method: 'POST',
        url: 'http://makertrails.herokuapp.com/signup',
        data: {
          username: username,
          password: password,
          email: email
        }
      })
      .then(function(success){
        $state.go('makerMap') // THIS WILL REDIRECT TO HOME
      }, function(err){
        console.log(err);
      })
    };
    return{
      login: login,
      signup: signup
    }
  // return {
  //   loginUser: function(name, password){
  //     var deferred = $q.defer();
  //     var promise = deferred.promise;

  //     if(name === 'user' && password === 'password'){
  //       deferred.resolve('Welcome '+ name);
  //     }else{
  //       deferred.reject('incorrect user name and password');
  //     }
  //     promise.success = function(callback){
  //       promise.then(callback);
  //       return promise;
  //     }
  //     promise.error = function(callback){
  //       promise.then(null, callback);
  //       return promise;
  //     }
  //     return promise;
  //   }
  // }
});