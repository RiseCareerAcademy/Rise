const express = require("express");
const controller = require("./user.controller.js");
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: path.resolve('./uploads/'),
    filename: function(req, file, cb){
       cb(null, file.originalname);
    }
  });

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
});


const router = express.Router();
module.exports.router = router;

// CREATE all 7 tables
router.post('/tables',controller.createTables);

// Delete all 7 tables
router.delete('/tables', controller.resetTable);


//POST request API for /user
router.post('/mentor', controller.postMentor);
router.post('/linkedin', controller.linkedin);
router.post('/mentee', controller.postMentee);

//GET request API for /user
router.get('/mentors',controller.getAllMentors);
router.get('/mentees',controller.getAllMentees);  
router.get('/passwords',controller.getAllPasswords);  
router.get('/skills',controller.getAllSkills);  
router.get('/professions',controller.getAllProfessions);  
router.get("/:id", controller.getUserById);

// //get email by id
router.get("/:id/email", controller.getEmailById);
//update email by id
router.put("/:id/email", controller.updateEmailById);

// //get hobbies by id
router.get("/:id/hobbies", controller.getHobbiesById);
//update hobbies by id
router.put("/:id/hobbies", controller.updateHobbiesById);

//get skill by user_id
router.get("/:id/skills", controller.getSkillbyId);
// //add a new skill
router.put("/:id/addskill", controller.addSkill);
//remove a new skill
router.put("/:id/removeskill", controller.removeSkill);

//get users by skill
router.get("/skill/:skill", controller.getUsersbySkill);

//get users by profession
router.get("/profession/:profession", controller.getUsersbyProfession);

//get first name and last name from user id
router.get("/name/:id", controller.getFirstLastById);


//get profile pic by id
router.get("/:id/profilepic", controller.getProfilePic);
//update profile pic by id
router.put("/:id/profilepic", controller.updateProfilePic);
router.post("/:id/profilepic", upload.single('photo'), controller.postProfilePic);

//get profession/area of study
router.get("/:id/profession", controller.getProfessionById);
//update profession or area of study
router.put("/:id/profession", controller.updateProfession);

//get bio of study
router.get("/:id/bio", controller.getBio);
//update bio
router.put("/:id/bio", controller.updateBio);
// //delete bio
router.delete("/:id/bio", controller.deleteBio);

// //update zipcode
router.put("/:id/zipcode",controller.updateZipcode);

// //login using email/password
router.post("/password",controller.register);

router.post("/login",controller.login);


// //MESSAGE API

//create a new message
router.post('/message', controller.postMessage);

//get all messages
router.get('/message/all', controller.getMessages);

//get latest message by message id
router.get('/message/:matchid', controller.getLatestMessagesById);

//get all message by message id

router.get('/message/all/:matchid', controller.getMessageChain);

// create a conversation ws connection
router.ws('/conversation', controller.conversation);
