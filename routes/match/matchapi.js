const express = require("express");
const controller = require("./match.controller.js");

const router = express.Router();
module.exports.router = router;

//create a new match entry
router.post('/', controller.postMatches);

//get everything from match tables
router.get('/',controller.getAllMatches);

//get match by match id 
router.get('/matchid/:id',controller.getMatchbyId);

//get match by user id 
router.get('/userid/:id',controller.getMatchbyUserId);
