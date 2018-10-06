const express = require("express");
const controller = require("./user.controller.js");

const router = express.Router();
module.exports.router = router;

// POST request API for /user
router.post('/login', controller.login);
router.post('/register', controller.register);