import Player from './Player.js';

export default class Warrior extends Player {

  constructor(weapon, energy, lifepoints, skin) {
    super(energy, lifepoints, skin);
    this.weapon = weapon;
  }
}
