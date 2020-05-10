import Constants from './Constants.js';

export default class Battlefield {

  constructor() {}

  fight(hero, monster) {
    if (hero.energy < 0.30) {
      monster.energy -= 0.30
      hero.lifepoints--
      return Constants.MESSAGE_MONSTER_WINS_LOW_ENERGY;
    }
    if (monster.energy < 0.30) {
      hero.energy -= 0.30
      monster.lifepoints--
      return Constants.MESSAGE_HERO_WINS_LOW_ENERGY;
    }
    hero.energy -= 0.30
    monster.energy -= 0.30
    if (monster.attackValue() > hero.attackValue()) {
      hero.lifepoints--
      return Constants.MESSAGE_MONSTER_WINS
    } else {
      monster.lifepoints--
      return Constants.MESSAGE_HERO_WINS
    }
  }
}
