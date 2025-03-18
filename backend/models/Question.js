/*
* Question class that defines a random question fetched from the database and it's correct answer
* Note: NEEDS TO BE UPDATED BY DOM!!!!! (I am not sure how db stuff works yet)
* Author: Caroline Curtis and Dom Colangelo
*/

const pool = require("../config/db");

class Question {

    // Return a random question based on the world type
    static async getRandomQuestion(world) {
        const result = await pool.query(
            "SELECT * FROM questions WHERE world = $1 ORDER BY RANDOM() LIMIT 1",
            [world]
        );
        return result.rows[0];
    }

}

module.exports = Question;
