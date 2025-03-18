/*
* Fetches player data for proper player progression based on specific users
* Author: Caroline Curtis
*/

const playerRepository = require("../repositories/playerRepository");

// Returns the player data matching the provided username
async function getPlayer(username) {

    return await playerRepository.findByUsername(username);

}

// Update player info
async function updatePlayerProgress(username, world, level) {

    return await playerRepository.updateProgress(username, world, level);

}

module.exports = { getPlayer, updatePlayerProgress };
