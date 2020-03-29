class Dice {

  constructor() {}

  getFade() {
    return Math.random() + 0, 5;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  between(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
}

class Player {

  constructor(weapon, energy, lifepoints, skin) {
    this.skin = skin;
    this.lifepoints = lifepoints;
    this.weapon = weapon;
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

class Battlefield {

  constructor() {}

  fight(hero, monster) {
    if (hero.energy < 0.30) {
      monster.energy -= 0.30
      hero.lifepoints--
      return MESSAGE_MONSTER_WINS_LOW_ENERGY;
    }
    if (monster.energy < 0.30) {
      hero.energy -= 0.30
      monster.lifepoints--
      return MESSAGE_HERO_WINS_LOW_ENERGY;
    }
    hero.energy -= 0.30
    monster.energy -= 0.30
    if (monster.attackValue() > hero.attackValue()) {
      hero.lifepoints--
      return MESSAGE_MONSTER_WINS
    } else {
      monster.lifepoints--
      return MESSAGE_HERO_WINS
    }
  }
}

class Model {

  constructor() {
    this.dice = new Dice();
    this.round = 1;
    this.heros = [];
    this.heros.push(new Player(new Weapon(WEAPON_SWORD), 1, 3, this.generateSkin(false, this.dice))); //TEMP
    this.heros.push(new Player(new Weapon(WEAPON_PICKAXE), 1, 2, this.generateSkin(false, this.dice))); //TEMP
    this.heros.push(new Player(new Weapon(WEAPON_AXE), 1, 3, this.generateSkin(false, this.dice))); //TEMP
    this.heros.push(new Player(new Weapon(WEAPON_SHOVEL), 1, 7, this.generateSkin(false, this.dice))); //TEMP

    this.monsters = [];
    this.monsters.push(new Player(new Weapon(WEAPON_HOE), 1, 3, this.generateSkin(true, this.dice))); //TEMP
    this.monsters.push(new Player(new Weapon(WEAPON_NONE), 1, 2, this.generateSkin(true, this.dice))); //TEMP
    this.monsters.push(new Player(new Weapon(WEAPON_SHOVEL), 1, 3, this.generateSkin(true, this.dice))); //TEMP
    this.monsters.push(new Player(new Weapon(WEAPON_PICKAXE), 1, 7, this.generateSkin(true, this.dice))); //TEMP
    this.battlefield = new Battlefield();
    this.monsterIndex = 0;
    this.heroIndex = 0;

    this.emptyCondition = "0 <i class='none'></i> 0 <i class='energy'></i> 0 <i class='heart'></i>";
  }

  generateSkin(isMonster, dice) {
    if (!isMonster) {
      switch (dice.between(1, 3)) {
        case 1:
          return "hero";
        case 2:
          return "hero2";
      }
    } else {
      switch (dice.between(1, 7)) {
        case 1:
          return "monster";
        case 2:
          return "monster2";
        case 3:
          return "monster3";
        case 4:
          return "monster4";
        case 5:
          return "monster5";
        case 6:
          return "monster6";
      }

    }
  }

  setHero(heroIndex) {
    this.heroIndex = heroIndex;
  }

  doFight() {
    var hero = this.heros[this.heroIndex]
    var monster = this.monsters[this.monsterIndex]
    var result = this.battlefield.fight(hero, monster)
    if (hero.lifepoints <= 0) {
      this.heros.splice(this.heroIndex, 1);
      return MESSAGE_MONSTER_WINS_FATAL
    } else if (monster.lifepoints <= 0) {
      this.monsters.splice(this.monsterIndex, 1);
      return MESSAGE_HERO_WINS_FATAL
    }
    return result
  }

  newMonster() {
    this.monsterIndex = this.dice.getRandomInt(this.monsters.length);
  }

  getHerosCondition(){
    let ergebnis = "";
    for(let i = 0; i < this.heros.length; i++){
      ergebnis = ergebnis + "<div class='item' onClick='app.changeHero(" + i + ")'><i class='" + this.heros[i].skin + "'></i>Stats: " + this.heros[i].getCondition() + "</div>";
    }
    return ergebnis;
  }

  getMonstersCondition(){
    let ergebnis = "";
    for(let i = 0; i < this.monsters.length; i++){
      ergebnis = ergebnis + "<div><i class='" + this.monsters[i].skin + "'></i>Stats: " + this.monsters[i].getCondition() + "</div>";
    }
    return ergebnis;
  }

  getMonstersLifepoints(){
    let ergebnis = 0;
    for(let i = 0; i < this.monsters.length; i++){
      ergebnis += this.monsters[i].lifepoints;
    }
    return ergebnis;
  }

  getHerosLifepoints(){
    let ergebnis = 0;
    for(let i = 0; i < this.heros.length; i++){
      ergebnis += this.heros[i].lifepoints;
    }
    return ergebnis;
  }

  regenerateMonstersAndHeros(){
    for(let i = 0; i < this.monsters.length; i++){
      this.monsters[i].energy += 0.05;
    }
    for(let i = 0; i < this.heros.length; i++){
      this.heros[i].energy += 0.05;
    }
  }
}
