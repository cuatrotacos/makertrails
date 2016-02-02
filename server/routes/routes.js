// Requirements
var controllers = require("../controllers")
var router = require('express').Router();
var path = require('path')
var utils = require('../helpers/utils.js');
var mobileControllers =  require("../controllers/mobile.js")

router.get('/', function(request, response){
  response.status(202).sendFile(path.resolve(__dirname + "../../../desktop_client/index.html"));
})

for(var route in controllers){
  if(route === 'signup' || route === 'login'){
    router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post)
    .put(controllers[route].put)
  } else{
    router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post)
    .put(controllers[route].put)


    // router.route("/" + route)
    // router.get(route, util.checkUser, controller[route].get)
  };
}

// This works without authentication for localhost
//
// for(var route in controllers){
//   router.route("/" + route)
//   .get(controllers[route].get)
//   .post(controllers[route].post)
//   .put(controllers[route].put)
// }
//
// for(var route in mobileControllers){
//   router.route("/" + route)
//   .get(mobileControllers[route].get)
//   .post(mobileControllers[route].post)
// }
//
// module.exports = router;
