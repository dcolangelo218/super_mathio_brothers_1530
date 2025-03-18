/*
* Enemy class that defines the enemy data and capabilities
* Note: CAROLINE NEEDS TO ADJUST THIS FOR BOSS ENEMIES!!!!
* Author: Caroline Curtis
*/

const Entity = require("./Entity");
const Question = require("./Question");

class Enemy extends Entity {

    // Constructor:
    constructor(name, health = 50, isSlain = false, world) {
        super(name, health, isSlain, world);
    }

    // Fetch a question from the database
    generateQuestion() {

        return Question.getRandomQuestion(this.world);

    }

}

module.exports = Enemy;
