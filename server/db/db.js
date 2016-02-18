var Sequelize = require("sequelize");
var buildMap = require("../test/buildMap.js").buildMap;
var sequelize;

if(process.env.DB_NAME){
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT
    }
  );
} else {
  sequelize = new Sequelize(
    "cuatro_tacos",
    "root",
    "", {
      "host": "localhost"
    }
  );
}

var User = sequelize.define("user", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  timestamps: false
});

var Map = sequelize.define("map", {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  user_id: Sequelize.INTEGER
}, {
  timestamps: false
});

var Location = sequelize.define("location", {
  name: Sequelize.STRING,
  msg: Sequelize.STRING,
  lat: Sequelize.FLOAT(53),
  lon: Sequelize.FLOAT(53),
  map_id: Sequelize.INTEGER,
  radius: Sequelize.FLOAT(18)
}, {
  timestamps: false
});

var Progress = sequelize.define("progress", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  visited: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  location_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER
}, {
  timestamps: false
});

var Review = sequelize.define("review", {
  location_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  body: Sequelize.TEXT,
  rating: Sequelize.INTEGER
});

var Photo = sequelize.define("photo", {
  location_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  link: Sequelize.TEXT
});

// User has many Maps, Map has one User
Map.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Map, {
  foreignKey: 'user_id'
});

//Map has many Locations, Location has one Map
Map.hasMany(Location, {
  foreignKey: 'map_id'
});

Location.belongsTo(Map, {
  foreignKey: 'map_id'
});

//Users have many Locations, Locations have many users
Location.belongsToMany(User, {
  through: {
    model: Progress
  },
  foreignKey: 'location_id'
});

User.belongsToMany(Location, {
  through: {
    model: Progress
  },
  foreignKey: 'user_id'
});

//Map has many Progresses, Progresses have one map
Map.hasMany(Progress, {
  foreignKey: 'map_id'
});

Progress.belongsTo(Map, {
  foreignKey: 'map_id'
});

//Reviews have one user and one Location
Review.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Review, {
  foreignKey: 'user_id'
});

Review.belongsTo(Location, {
  foreignKey: 'location_id'
});

Location.hasMany(Review, {
  foreignKey: 'location_id'
});

//Photos have one Location and one Users
Photo.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Photo, {
  foreignKey: 'user_id'
});

Photo.belongsTo(Location, {
  foreignKey: 'location_id'
});

Location.hasMany(Photo, {
  foreignKey: 'location_id'
});

User.sync().then(function(){
  Map.sync().then(function(){
    Location.sync().then(function(){
      Progress.sync().then(function(){
        Review.sync().then(function(){
          Photo.sync().then(function(){
            buildMap();
          });
        });
      });
    });
  });
});

exports.User = User;
exports.Map = Map;
exports.Location = Location;
exports.Progress = Progress;
exports.Review = Review;
exports.Photo = Photo;
exports.sequelize = sequelize;
