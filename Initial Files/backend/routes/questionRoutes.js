/*
* Simple route file for questions
* Note: NEED TO START!!!
* Author: Caroline Curtis
*/

const express = require("express");
const questionController = require("../controllers/questionController");

const router = express.Router();

router.get("/:world", questionController.getRandomQuestion);

module.exports = router;
