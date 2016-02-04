angular.module("App.map") //placeholder name
.directive("trailMap", trailsMap)

function trailsMap(mapFactory) {
  var link = function($scope, $el){ //el is an array of the element (plus its children) where this directive is used
    var map = new GMaps({
      div: '#map', //$el[0]??????
      lat: 34.0192316,
      lng: -118.4943091,
      zoom: 15
    })

  };

  return: {
    restrict: "E",
    scope: true,
    replace: true, //stolen from brewski && tutorial fiddle
    link: link
    template: [
      "<div id='map'>",
      "</div>",
      "<div id='markers-with-coordinates'>",
      "</div>"
    ].join("")
  }
}
