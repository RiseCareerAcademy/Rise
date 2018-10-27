const express = require("express");
const controller = require("./user.controller.js");

const router = express.Router();
module.exports.router = router;

//CREATE NEW TABLE 
router.post('/tables',controller.createTables);

//delete table
router.delete('/tables',controller.deletetable);

// POST request API for /user
router.post('/mentor', controller.postMentors);
router.post('/mentee', controller.postMentees);
router.post('/matches', controller.postMatches);


// GET request API for /user 
router.get('/mentor',controller.getAllMentors);
router.get('/mentee',controller.getAllMentees);  
router.get('/matches',controller.getAllMatches);