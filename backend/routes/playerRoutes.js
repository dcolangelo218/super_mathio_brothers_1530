/*
* Simple route file for player
* Author: Caroline Curtis
*/

const express = require("express");
const playerController = require("../controllers/playerController");

const router = express.Router();

router.post("/next-level", playerController.moveToNextLevel);
router.post("/return-to-tutorial", playerController.returnToTutorial);
router.post("/battle-commenced", playerController.battle);


module.exports = router;

