const express = require("express");
const controller = require("./message.controller.js");

const router = express.Router();
module.exports.router = router;

//create a new message 
<<<<<<< HEAD
router.post('/message', controller.postMessage);
=======
router.post('/', controller.postMessage);


//get all messages 
router.get('/', controller.getMessages);
>>>>>>> master
