/*
* Handles player based database queries
* Note: DOM NEEDS TO UPDATE!!!!
* Author: Caroline Curtis
*/

const pool = require("../config/db");

// Finds player data in the database by provided username
async function findByUsername(username) {

    const result = await pool.query("SELECT * FROM players WHERE username = $1", [username]);
    return result.rows[0];

}

// Update player data in the database
async function updateProgress(username, world, level) {
    await pool.query("UPDATE players SET world = $1, level = $2 WHERE username = $3", [world, level, username]);
}

module.exports = { findByUsername, updateProgress };
