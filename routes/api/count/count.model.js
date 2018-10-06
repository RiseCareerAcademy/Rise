const mongoose = require("mongoose");

// Create a schema to prevent bad input data types
// Google "Mongoose Schema datatypes" for more help
// Also if you want an value to be whatever just use
// myRandomValue : {}
const CountSchema = new mongoose.Schema(
  {
    count: Number
  },
  { collection: "count" }
);

module.exports = mongoose.model("Count", CountSchema);
