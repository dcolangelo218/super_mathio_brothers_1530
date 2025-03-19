/*
* Level class that defines the Level data and capabilities
* Author: Caroline Curtis
*/

const Enemy = require("./Enemy");

class Level {

    // Constructor: 
    constructor(levelNum, worldNum) {
        this.levelNum = levelNum;
        this.worldNum = worldNum;
    }

    // Generates enemy for a level
    generateEnemy() {

        if(this.levelNum === 5)
        {
            return new Enemy("Boss", 3, this.worldNum)
        }
        else {
            return new Enemy("Foe", 1, this.worldNum)
        }
        
    }

    // Generate next level, do nothing if we are at the final level of the final world
    generateNextLevel() {

        if (this.levelNum < 5) {
            return new Level(this.levelNum + 1, this.worldNum);
        } else if (this.worldNum < 4) {
            return new Level(1, this.worldNum + 1); 
        }

    }

}
