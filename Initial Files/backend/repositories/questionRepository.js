/*
* Handles question based database queries
* Author: Caroline Curtis
*/

const pool = require("../config/db");

class questionRepository {

    static async getRandomQuestion(world) {

        try {
            const result = await pool.query(
                "SELECT question, answer FROM questions WHERE world = $1 ORDER BY RANDOM() LIMIT 1",
                [world]
            );
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching question:", error);
            throw error;
        }
        
    }

}

module.exports = questionRepository;
