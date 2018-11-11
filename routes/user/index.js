const express = require("express");
const controller = require("./user.controller.js");

const router = express.Router();
module.exports.router = router;

//CREATE all five tables
router.post('/tables',controller.createTables);

//delete table
router.delete('/tables',controller.deletetable);

// POST request API for /user
router.post('/mentor', controller.postMentor);
router.post('/mentee', controller.postMentee);
router.post('/password', controller.postPassword);
router.post('/skill', controller.postSkill);


// GET request API for /user 
router.get('/mentors',controller.getAllMentors);
router.get('/mentees',controller.getAllMentees);  
router.get('/passwords',controller.getAllPasswords);  
router.get('/skills',controller.getAllSkills);  



//get user by id
router.get("/:id", controller.getUserById);

//login in to check if id = email for account 
router.post('/:id/email/:email',controller.checkEmail);


//get email by id
router.get("/:id/email", controller.getEmailById);
//update email by id
router.put("/:id/email/:email", controller.updateEmailById);

//get hobbies by id
router.get("/:id/hobbies", controller.getHobbiesById);
//update hobbies by id
router.put("/:id/hobbies/:hobby", controller.updateHobbiesById);
//delete hobbies by id
router.delete("/:id/hobbies", controller.deleteHobbiesById);


//get skill by user_id 
router.get("/:id/skills", controller.getSkillbyId);

//update skill by user_id 
router.put("/:id/skills", controller.updateSkill);

//get users by skill 
router.get("/skill/:skill", controller.getUsersbySkill);

//update users by skills 
router.put("/skill/:skill", controller.updateUsersbySkill);


//get profile pic by id 
router.get("/:id/profilepic", controller.getProfilePic);
//update profile pic by id 
router.put("/:id/profilepic", controller.updateProfilePic);


//get profession/area of study 
router.get("/:id/profession", controller.getProfession);
//update profession or area of study 
router.put("/:id/profession/:profession", controller.updateProfession);

//get bio of study 
router.get("/:id/bio", controller.getBio);
//update bio 
router.put("/:id/bio/:bio", controller.updateBio);
//delete bio
router.delete("/:id/bio", controller.deleteBio);

//update zipcode
router.put("/:id/zipcode/:zipcode",controller.updateZipcode);


//login using email/password
router.post("/login",controller.login);


