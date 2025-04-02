/*
* World class that defines the world data and capabilities
* Author: Caroline Curtis
*/

const Level = require("./Level");

class Map {

    // Generates the very first level
    generateFirstLevel() {

        return new Level(1, 1);

    }

}


