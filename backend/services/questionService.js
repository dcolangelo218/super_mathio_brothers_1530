/*
* Fetches question data for generating questions
* Author: Caroline Curtis
*/

const questionRepository = require("../repositories/questionRepository");

// Returns a question based on the world type
async function getQuestion(world) {

    return await questionRepository.getByWorld(world);
    
}

module.exports = { getQuestion };
