/*
* Handles player related HTTP requests
* Note: DOM NEEDS TO EDIT!!!!
* Author: Caroline Curtis
*/

const playerService = require("../services/playerService");

class playerController {

    static async battle(req,res) {

        try {
            const player = await playerService.processBattleResult(req.body.player, req.body.playerAnswer, req.body.question, req.body.enemy);
            res.json({ message: "battle-commenced", player });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }


    }

    static async moveToNextLevel(req, res) {

        try {
            const player = await playerService.moveToNextLevel(req.body.name);
            res.json({ message: "next-level", player });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }

    static async returnToTutorial(req, res) {

        try {
            const player = await playerService.returnToTutorial(req.body.name);
            res.json({ message: "return-to-tutorial", player });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }

}

module.exports = playerController;
