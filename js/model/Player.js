import Weapon from './Weapon.js';
import Constants from './Constants.js';
import Dice from './Dice.js';

export default class Player {

  constructor(energy, lifepoints, skin) {
    this.skin = skin;
    this.lifepoints = lifepoints;
    this.weapon = new Weapon(Constants.WEAPON_NONE);
    this.energy = energy;
    this.dice = new Dice();
  }

  attackValue() {
    return this.weapon.getAttackValue() * this.energy * (Math.random() * (1.5 - 0.5) + 0.5);
  }

  getCondition(){
    return this.weapon.getAttackValue() + " <i class='" + this.weapon.getTexture() + "'></i> " + this.energy.toFixed(2) + "  <i class='energy'></i> " + this.lifepoints + " <i class='heart'></i>";
  }
}
