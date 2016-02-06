angular.module("App") //placeholder name
.directive("trailMap", trailMap)

function trailMap(MapFactory) {
  var link = function($scope, $el){
    //el is an array of the element (plus its children) where this directive is used
    var $map = $scope.map

    GMaps.on('click', $map.map, function(event) {
      var index = $map.markers.length;
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();

      var newLocation = {
        lat: lat,
        lng: lng,
        name: "Location " + (index + 1),
        editing: false
      }
      // lat/lng added on click, sent to array
      $scope.selectedLocations.push(newLocation)
      $scope.$apply();
      $map.addMarker({
        lat: newLocation.lat,
        lng: newLocation.lng,
        title: newLocation.name, //Here's where the marker gets its name. We should make this editable so users can name the location whatever they want (to fill POST Body: "name")
        infoWindow: {
          content : newLocation.name
        }
      });
    });

  };
  return {
    restrict: "E",
    scope: true,
    replace: true, //stolen from brewski && tutorial fiddle
    link: link,
    controllerAs: "vm",
    template: [
      "<div>",
      "<div id='map'>",
      "</div>"
    ].join("")
  }
}
