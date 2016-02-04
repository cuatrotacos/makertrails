angular.module('app.CollisionFactory', [])

.factory('CollisionFactory', collisionFactory);

function collisionFactory() {
  var toRadians = function(deg) {
    return deg * Math.PI / 180;
  };

  var haversine = function(lat1, lng1, lat2, lng2) {
    console.log('lat longs from haversine', lat1, lng1, lat2, lng2)
    lat1 = toRadians(lat1);
    lng1 = toRadians(lng1);
    lat2 = toRadians(lat2);
    lng2 = toRadians(lng2);

    var dlat = lat1 - lat2;
    var dlng = lng1 - lng2;

    var angle = math.pow(math.sin(dlat / 2), 2) + math.cos(lat1) * math.cos(lat2) * math.pow(math.sin(dlng / 2), 2);
    var circle = 2 * math.atan2(math.sqrt(angle), math.sqrt(1 - angle));
    var distance = 6367000 * circle;

    return distance;
  };

  return {
    withinRange: function(lat1, lng1, lat2, lng2, m) {
      var dist = haversine(lat1, lng1, lat2, lng2);
      return dist <= m;
    }
  };
}
