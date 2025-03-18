/*
* Player class that defines the Player data and capabilities
* Author: Caroline Curtis
*/

const Entity = require("./Entity");

class Player extends Entity {

    // Constructor:
    constructor(name, health = 3, isSlain = false, world = 1, level = 1) {
        super(name, health, isSlain, world);
        this.world = world;
        this.level = level;
    }

    // When prompted, the player can answer a question provided by an enemy
    // If the answer is incorrect, the player will take damage
    answerQuestion() {

        // CODE

    }

    // When in the tutorial level, the player can ask the AI Companion questions
    askQuestion() {

        // CODE

    }
    
    // When the player fails three questions, they are sent back to the tutorial
    returnToTutorial() {

        if(this.isSlain == true) {
            this.isSlain = false;
            this.level = 1;
            console.log(`${this.name} is out of lives! Returning to tutorial...`);
        }

    }

}

module.exports = Player;
