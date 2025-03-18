/*
* Simple route file for player
* Author: Caroline Curtis
*/

const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.get("/:username", playerController.getPlayer);
router.post("/progress", playerController.updateProgress);

module.exports = router;
