const express = require("express");
const controller = require("./user.controller.js");

const router = express.Router();
module.exports.router = router;

//CREATE all 5 tables
router.post('/tables',controller.createTables);

//Delete all 5 tables
router.delete('/tables',controller.deletetable);  

//POST request API for /user
router.post('/mentor', controller.postMentor);
router.post('/mentee', controller.postMentee);
router.post('/password', controller.postPassword);
router.post('/skill', controller.postSkill);
router.post('/profession', controller.postProfession);

//GET request API for /user 
router.get('/mentors',controller.getAllMentors);
router.get('/mentees',controller.getAllMentees);  
router.get('/passwords',controller.getAllPasswords);  
router.get('/skills',controller.getAllSkills);  
router.get('/professions',controller.getAllProfessions);  
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

//get skill by user_id 
router.get("/:id/skills", controller.getSkillbyId);
router.put("/:id/addskill", controller.addSkill);
router.put("/:id/removeskill", controller.removeSkill);

//get users by skill 
router.get("/skill/:skill", controller.getUsersbySkill);

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
router.put("/:id/bio", controller.updateBio);
//delete bio
router.delete("/:id/bio", controller.deleteBio);

//update zipcode
router.put("/:id/zipcode/:zipcode",controller.updateZipcode);

//login using email/password
router.post("/login",controller.login);

//MESSAGE API

//create a new message 
router.post('/message', controller.postMessage);

//get all messages 
router.get('/message', controller.getMessages);

//get message by message id 
router.get('/message/:matchid', controller.getLatestMessageById);

//get all message by message id 
router.get('/message/all/:matchid', controller.getMessageChain);