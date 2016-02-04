angular.module('app.MakerMapController', [])

.controller('MakerMapController', makerMapController);

function makerMapController(MakerMapFactory) {
  MakerMapFactory.getMapLocations();
}