import Constants from '../model/Constants.js';

export default class Weapon {

  constructor(type) {
    this.type = type
  }

  getAttackValue() {
    return this.type;
  }

  getTexture() {
    switch(this.type) {
      case Constants.WEAPON_NONE:
        return "none";
      case Constants.WEAPON_HOE:
        return "hoe";
      case Constants.WEAPON_PICKAXE:
        return "pickaxe";
      case Constants.WEAPON_SHOVEL:
        return "shovel";
      case Constants.WEAPON_SWORD:
        return "sword";
      case Constants.WEAPON_AXE:
        return "axe";
    }
  }
}
