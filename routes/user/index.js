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


//get user by id
router.get("/:id", controller.getUserById);

//get email by id
router.get("/:id/email", controller.getEmailById);
//update email by id
router.put("/:id/email", controller.updateEmailById);
//get hobbies by id
router.get("/:id/hobbies", controller.getHobbiesById);
//update hobbies by id
router.put("/:id/hobbies", controller.updateHobbiesById);
//delete hobbies by id
router.delete("/:id/hobbies", controller.deleteHobbiesById);
//get blocked users by id
router.get("/:id/blocked_users", controller.getBlockedUsersById);
//add blocked users by id
router.post("/:id/:block_id", controller.addBlockedUsersById);


//get skill by id 
router.get("/:id/skills", controller.getSkillbyId);

//add skill by id 

//delete skill by id 