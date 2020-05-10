class Weapon {

  constructor(type) {
    this.type = type
  }

  getAttackValue() {
    return this.type;
  }

  getTexture() {
    switch(this.type) {
      case WEAPON_NONE:
        return "none";
      case WEAPON_HOE:
        return "hoe";
      case WEAPON_PICKAXE:
        return "pickaxe";
      case WEAPON_SHOVEL:
        return "shovel";
      case WEAPON_SWORD:
        return "sword";
      case WEAPON_AXE:
        return "axe";
    }
  }
}
