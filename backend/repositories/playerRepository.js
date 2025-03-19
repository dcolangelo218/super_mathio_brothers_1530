/*
* Handles player based database queries
* Note: DOM NEEDS TO UPDATE!!!!
* Author: Caroline Curtis
*/

const pool = require("../config/db");

class playerRepository {

    static async getPlayerByName(name) {

        const result = await pool.query("SELECT * FROM players WHERE name = $1", [name]);
        return result.rows[0];

    }

    static async updatePlayerProgress(name, world, level, health) {

        await pool.query(
            "UPDATE players SET world = $1, level = $2, health = $3 WHERE name = $4",
            [world, level, health, name]
        );
        return result.rows[0];

    }

    static async createPlayer(name) {

        await pool.query("INSERT INTO players (name, world, level, health) VALUES ($1, 1, 1, 3)", [name]);
        
    }

}

module.exports = playerRepository;
