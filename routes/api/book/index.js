const express = require("express");
const controller = require("./book.controller.js");

const router = express.Router();
module.exports.router = router;

// Create last layer of API call so a POST request to /api/count/start
// will run the "start" function the controller
router.get("/:id", controller.getById);
router.get("/rating/:rating", controller.getByRating);
router.get("/authors/all", controller.getAllAuthors);

router.post("/", controller.add);
router.post("/update/rating/", controller.updateRating);

router.delete("/:id", controller.remove);