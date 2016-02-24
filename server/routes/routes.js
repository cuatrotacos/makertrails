// Requirements
var controllers = require("../controllers");
var router = require('express').Router();
var path = require('path');
var utils = require('../helpers/utils.js');

router.get('/', function(request, response){
  response.status(202).sendFile(path.resolve(__dirname + "../../../desktop_client/index.html"));
});

router.get('/mapInfo', utils.checkUser, function (request, response) {
  controllers.mapInfo.get(request, response);
});

router.post('/mapInfo', utils.checkUser, function (request, response) {
  controllers.mapInfo.post(request, response);
});

router.get('/mapInfo/:id', function (request, response) {
  controllers.mapInfo.getOne(request, response);
});

router.delete('/mapInfo/:id', utils.checkUser, function (request, response) {
  controllers.mapInfo.delete(request, response);
});

router.post('/photos', utils.checkUser, function (request, response) {
  console.log("+++ 20 routes.js photos route hit");
  controllers.photos.post(request, response);
});

router.get('/photos', utils.checkUser, function (request, response) {
  console.log("+++ 25 routes.js photos route");
  controllers.photos.get(request, response);
});

router.get('/userMaps', utils.checkUser, function (request, response) {
  controllers.userMaps.get(request, response);
});

router.get('/location', utils.checkUser, function (request, response) {
  controllers.location.get(request, response);
});

router.get('/progress', utils.checkUser, function (request, response) {
  controllers.progress.get(request, response);
});

router.put('/progress', function (request, response) {
  controllers.progress.put(request, response);
});

router.get('/review', utils.checkUser, function (request, response) {
  controllers.review.get(request, response);
});

router.post('/review', utils.checkUser, function (request, response) {
  controllers.review.post(request, response);
});

router.post('/signup', function (request, response) {
  controllers.signup.post(request, response);
});

router.post('/login', function (request, response) {
  controllers.login.post(request, response);
});

router.get('/logout', function (request, response) {
  controllers.logout.get(request, response);
});

module.exports = router;
