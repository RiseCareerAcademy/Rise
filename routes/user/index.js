const express = require("express");
const controller = require("./user.controller.js");

const router = express.Router();
module.exports.router = router;

// POST request API for /user
router.post('/regMentor', controller.postMentors);
router.get('/getMentor',controller.getMentors)