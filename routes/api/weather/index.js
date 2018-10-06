const express = require("express");
const controller = require("./weather.controller.js");

const router = express.Router();
module.exports.router = router;

// Create last layer of API call so a POST request to /api/count/start
// will run the "start" function the controller
router.post("/", controller.get);
router.post("/add", controller.add);
router.post("/deleteAll", controller.deleteAll);