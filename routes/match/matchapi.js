const express = require("express");
const controller = require("./match.controller.js");

const router = express.Router();
module.exports.router = router;

//create a new match entry
router.post('/', controller.postMatches);

//get everything from match tables
router.get('/',controller.getAllMatches);

//get match by match id 
router.get('/matchid/:id',controller.getMatchById);

//get match by user id 
router.get('/userid/:id',controller.getMatchByUserId);

//get a rating by match id 
router.get('/rating/:matchid',controller.getRatingByMatchId);

//get a rating by mentor id 
router.get('/rating/userid/:userid',controller.getRatingByMentorId);

//add a rating in a new match 
router.put("/rating/:matchid/:rating",controller.addRating);
