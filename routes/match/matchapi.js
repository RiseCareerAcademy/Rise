const express = require("express");
const controller = require("./match.controller.js");

const router = express.Router();
module.exports.router = router;

//create a new match entry
router.post('/pair', controller.postMatches);

//get everything from match tables
router.get('/all',controller.getAllMatches);

//get match by match id 
router.get('/:id',controller.getMatchbyId);

