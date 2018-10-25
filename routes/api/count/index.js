const express = require("express");
const controller = require("./count.controller.js");

const router = express.Router();
module.exports.router = router;

// Create last layer of API call so a POST request to /api/count/start
// will run the "start" function the controller
router.get("/:id", controller.get);
router.post("/start", controller.start);
router.post("/:id/:count", controller.update);
router.delete("/:id", controller.remove);