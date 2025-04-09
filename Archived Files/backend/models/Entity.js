/*
* Entity Parent Class for Player and Enemy child classes
* Author: Caroline Curtis
*/

class Entity {

    // Constructor:
    constructor(name, health, world) {
        this.name = name;
        this.health = health;
        this.world = world;
    }

    // Reduces health and determines if the entity has been slain:
    takeDamage() {
        
        if (this.health > 0) {
            this.health -= 1;
            if (this.health <= 0) {
            this.health = 0;
            console.log(`${this.name} has been slain!`);
            }
        }
        
    }
}

module.exports = Entity;
