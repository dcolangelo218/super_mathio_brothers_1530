/*
* Fetches question data for generating questions
* Author: Caroline Curtis
*/

const questionRepository = require("../repositories/questionRepository");

class questionService {

    static async fetchRandomQuestion(world) {

        return await questionRepository.getRandomQuestion(world);

    }

}

module.exports = questionService;

