import Battlefield from './Battlefield.js';
import Constants from './Constants.js';
import Dice from './Dice.js';
import Player from './Player.js';
import Warrior from './Warrior.js';
import Weapon from './Weapon.js';

export default class Model {

  constructor() {
    this.dice = new Dice();
    this.round = 1;
    this.heros = [];
    this.heros.push(new Warrior(new Weapon(Constants.WEAPON_SWORD), 1, 3, this.generateSkin(false, this.dice))); //TEMP
    this.heros.push(new Warrior(new Weapon(Constants.WEAPON_PICKAXE), 1, 2, this.generateSkin(false, this.dice))); //TEMP
    this.heros.push(new Warrior(new Weapon(Constants.WEAPON_AXE), 1, 3, this.generateSkin(false, this.dice))); //TEMP
    this.heros.push(new Warrior(new Weapon(Constants.WEAPON_SHOVEL), 1, 7, this.generateSkin(false, this.dice))); //TEMP

    this.monsters = [];
    this.monsters.push(new Warrior(new Weapon(Constants.WEAPON_HOE), 1, 3, this.generateSkin(true, this.dice))); //TEMP
    this.monsters.push(new Player(1, 2, this.generateSkin(true, this.dice))); //TEMP
    this.monsters.push(new Warrior(new Weapon(Constants.WEAPON_SHOVEL), 1, 3, this.generateSkin(true, this.dice))); //TEMP
    this.monsters.push(new Warrior(new Weapon(Constants.WEAPON_PICKAXE), 1, 7, this.generateSkin(true, this.dice))); //TEMP
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
      return Constants.MESSAGE_MONSTER_WINS_FATAL
    } else if (monster.lifepoints <= 0) {
      this.monsters.splice(this.monsterIndex, 1);
      return Constants.MESSAGE_HERO_WINS_FATAL
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
