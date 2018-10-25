const mongoose = require("mongoose");

// Create a schema to prevent bad input data types
// Google "Mongoose Schema datatypes" for more help
// Also if you want an value to be whatever just use
// myRandomValue : {}
const WeatherSchema = new mongoose.Schema(
  {
	giphy: String,
	city: String,
	weather: String
  },
  { collection: "count" }
);

module.exports = mongoose.model("Weather", WeatherSchema);
