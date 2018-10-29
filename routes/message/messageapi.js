const express = require("express");
const controller = require("./message.controller.js");

const router = express.Router();
module.exports.router = router;

//create a new message 
router.post('/message', controller.postMessage);

//get all messages 
router.get('/messages', controller.getMessages);
