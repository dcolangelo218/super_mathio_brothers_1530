/*
* Entity Parent Class for Player and Enemy child classes
* Author: Caroline Curtis
*/

class Entity {

    // Constructor:
    constructor(name, health, isSlain, world) {
        this.name = name;
        this.health = health;
        this.isSlain = isSlain;
        this.world = world;
    }

    // Reduces health and determines if the entity has been slain:
    takeDamage() {
        this.health -= 1;
        if (this.health <= 0) {
            this.health = 0;
            this.isSlain = true;
            console.log(`${this.name} has been slain!`);
        }
    }
}

module.exports = Entity;
