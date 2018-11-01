const express = require("express");
const controller = require("./message.controller.js");

const router = express.Router();
module.exports.router = router;

//create a new message 
router.post('/', controller.postMessage);


//get all messages 
router.get('/', controller.getMessages);
<<<<<<< HEAD
=======

//get message by message id 
router.get('/:matchid', controller.getLatestMessagebyId);

//get message by message id 
router.get('/all/:matchid', controller.getMessageChain);
>>>>>>> 305b3a3b8298c9b4e6492f18701116328a591b89
