/*
* Carries out game operations
* Author: Caroline Curtis
*/

const playerRepository = require("../repositories/playerRepository");
const Player = require("../models/Player");

class playerService {

    static async objectFromDatabase(name) {

        let playerInfo = await playerRepository.getPlayerByName(name);
        if (!playerInfo) throw new Error("Player not found");
        return new Player(playerInfo.name, playerInfo.health, playerInfo.world, playerInfo.level);

    }

    static async processBattleResult(name, playerAnswer, question, enemy)  {

        let player = await objectFromDatabase(name);
        let result = player.answerQuestion(playerAnswer, question);
        if (result === true) {
            enemy.takeDamage();
        } 

    }

    static async moveToNextLevel(name) {

        let player = await objectFromDatabase(name);
        player.moveToNextLevel();
        return player;

    }

    static async returnToTutorial(name) {

        let player = await objectFromDatabase(name);
        player.tutorialReturn();
        return player;

    }

}

module.exports = playerService;
