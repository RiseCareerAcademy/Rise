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
	limits: { fileSize: 1000000 },
});

const router = express.Router();
module.exports.router = router;

//CREATE all five tables
router.post('/tables',controller.createTables);

//delete table
router.delete('/tables',controller.deletetable);

// POST request API for /user
router.post('/mentor', controller.postMentors);
router.post('/mentee', controller.postMentees);
router.post('/password', controller.postPasswords);


// GET request API for /user 
router.get('/mentor',controller.getAllMentors);
router.get('/mentee',controller.getAllMentees);  
router.get('/password',controller.getAllPasswords);  



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


//get skill by id 
router.get("/:id/skills", controller.getSkillbyId);

//add skill by id 
router.put("/:id/skills/:skill", controller.addSkill);

//delete skill by id 
//router.delete("/:id/:skill", controller.deleteSkill);

//get profile pic by id 
router.get("/:id/profilepic", controller.getProfilePic);
//update profile pic by id 
router.put("/:id/profilepic/:profilepic", controller.updateProfilePic);
router.post("/:id/profilepic", upload.single('photo'), controller.postProfilePic);

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


