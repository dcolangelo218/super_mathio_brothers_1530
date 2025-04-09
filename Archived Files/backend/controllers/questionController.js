/*
* Handles question related HTTP requests
* Note: NEED TO START!!!!
* Author: Caroline Curtis
*/

const questionService = require("../services/questionService");

class questionController {

    static async getRandomQuestion(req, res) {

        try {
            const question = await questionService.fetchRandomQuestion(req.params.world);
            if (!question) {
                return res.status(404).json({ error: "No questions found for this world" });
            }
            res.json(question);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }

    }

}

module.exports = questionController;
