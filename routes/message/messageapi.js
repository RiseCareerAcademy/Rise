const express = require("express");
const controller = require("./message.controller.js");

const router = express.Router();
module.exports.router = router;

//create a new message 
router.post('/', controller.postMessage);


//get all messages 
router.get('/', controller.getMessages);

<<<<<<< HEAD
//get latest message by message id 
router.get('/:matchid', controller.getLatestMessagebyId);
=======
//get message by message id 
router.get('/:matchid', controller.getLatestMessageById);
>>>>>>> 0a5963141419585528bd04f469d47f3d884fff83

//get all message by message id 
router.get('/all/:matchid', controller.getMessageChain);
