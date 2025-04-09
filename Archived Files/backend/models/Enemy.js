/*
* Enemy class that defines the enemy data and capabilities
* Author: Caroline Curtis
*/

const Entity = require("./Entity");
const questionService = require("../services/questionService");

class Enemy extends Entity {

    // Constructor:
    constructor(name, health, world) {
        super(name, health, world);
    }

    // Fetch a question from the database
    async generateQuestion() {

        return await questionService.fetchRandomQuestion(this.world);

    }

}

module.exports = Enemy;
