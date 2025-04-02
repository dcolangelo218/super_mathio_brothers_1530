/*
* Player class that defines the Player data and capabilities
* Note: NEED TO FINISH AI STUFF!!!
* Author: Caroline Curtis
*/

const Entity = require("./Entity");
const playerService = require("../services/playerService");

class Player extends Entity {

    // Constructor:
    constructor(name, health = 3, world = 1, level = 1) {
        super(name, health, world);
        this.level = level;
    }

    // When prompted, the player can answer a question provided by an enemy
    // If the answer is incorrect, the player will take damage
    answerQuestion(playerAnswer, question) {

        if(playerAnswer.toString().trim().toLowerCase() === question.answer.toString().trim().toLowerCase()) {
            return true;
        }
        else {
            this.takeDamage();
            this.tutorialReturn();
            playerService.updatePlayerProgress(this.name, this.world, this.level, this.health);
            return false;
        }

    }

    // Move to next level
    // Do nothing if at the last level in the last world
    moveToNextLevel() {

        if (this.level < 5) {
            this.level += 1; 
        } else if (this.world < 4) {
            this.world += 1;
            this.level = 1;  
        }
        playerService.updatePlayerProgress(this.name, this.world, this.level, this.health);

    }
    
    // When the player fails three questions, they are sent back to the tutorial
    tutorialReturn() {

        if(this.health === 0) {
            this.level = 1;
            this.health = 3;
            console.log(`${this.name} is out of lives! Returning to tutorial...`);
        }

    }

    // When in the tutorial level, the player can ask the AI Companion questions
    askQuestion(playerQuestion) {

        // CODE

    }

}

module.exports = Player;
