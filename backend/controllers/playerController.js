/*
* Handles player related HTTP requests
* Note: DOM NEEDS TO EDIT!!!!
* Author: Caroline Curtis
*/

const playerService = require("../services/playerService");

// Attempts to find player data in db
async function getPlayer(req, res) {

    try {
        const player = await playerService.getPlayer(req.params.username);
        res.json(player);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }

}

// Attempts to update player data in db
async function updateProgress(req, res) {

    try {
        const { username, world, level } = req.body;
        await playerService.updatePlayerProgress(username, world, level);
        res.json({ message: "Progress updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }

}

module.exports = { getPlayer, updateProgress };
