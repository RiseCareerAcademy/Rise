const express = require("express");
const controller = require("./user.controller.js");

const router = express.Router();
module.exports.router = router;

// POST request API for /user
router.post('/mentor', controller.postMentors);
router.post('/mentee', controller.postMentees);
router.post('/matches', controller.postMatches);


// GET request API for /user 
router.get('/mentor',controller.getMentors);
router.get('/mentor',controller.getMentors);  
router.get('/mentor',controller.getMentors);