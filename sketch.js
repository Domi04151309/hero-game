// View ########################################################################
class View {

  constructor() {
    this.lbl1 = document.getElementById("round");
    this.lbl3 = document.getElementById("heroLifes");
    this.lbl5 = document.getElementById("monsterLifes");
    this.scrollbox1 = document.getElementById("heros");
    this.scrollbox2 = document.getElementById("monsters");
    this.lbl8 = document.getElementById("selectedMonster");
    this.lbl9 = document.getElementById("selectedHero");
    this.btn4 = document.getElementById("run");
  }
}

// Controller ##################################################################
class Controller {

  constructor(viewToUse, modelToUse) {
    this.view = viewToUse;
    this.model = modelToUse;
    this.view.btn4.addEventListener("click", this.btn1Pressed.bind(this));
    this.updateView();
  }

  updateView() {
    this.view.lbl1.innerHTML = this.model.round;
    this.view.scrollbox1.innerHTML = this.model.getHerosCondition();
    this.view.scrollbox2.innerHTML = this.model.getMonstersCondition();
    this.view.scrollbox1.childNodes[this.model.heroIndex].classList.add("selected");
    this.view.scrollbox2.childNodes[this.model.monsterIndex].classList.add("selected");
    this.view.lbl8.innerHTML = this.model.monsters[this.model.monsterIndex].getCondition();
    this.view.lbl9.innerHTML = this.model.heros[this.model.heroIndex].getCondition();
    this.view.lbl3.innerHTML = this.model.getHerosLifepoints();
    this.view.lbl5.innerHTML = this.model.getMonstersLifepoints();
  }

  changeHero(index) {
    this.model.setHero(index);
    var heros = this.view.scrollbox1.childNodes;
    heros.forEach(hero => hero.classList.remove("selected"));
    heros[index].classList.add("selected");
    this.view.lbl9.innerHTML = this.model.heros[index].getCondition();
  }

  btn1Pressed() {
    this.model.doFight()
    this.model.regenerateMonstersAndHeros();
    this.model.round++;
    this.model.newMonster()
    this.updateView();
  }
}


// Modell ######################################################################
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

  constructor(energy, fightforce, lifepoints, skin) {
    this.skin = skin;
    this.lifepoints = lifepoints;
    this.fightforce = fightforce;
    this.energy = energy;
    this.dice = new Dice();
  }

  attackValue() {
    return this.fightforce * this.energy * (Math.random() * (1.5 - 0.5) + 0.5);
  }

  getCondition(){
    return this.fightforce + "  <i class='force'></i> " + this.energy.toFixed(2) + "  <i class='energy'></i> " + this.lifepoints + "  <i class='heart'></i>";
  }
}

class Battlefield {

  constructor() {}

  fight(hero, monster) {
    hero.energy -= 0.30
    monster.energy -= 0.30
    if (monster.attackValue() > hero.attackValue()) {
      hero.lifepoints--
      return monster
    } else {
      monster.lifepoints--
      return hero
    }
  }
}

class Model {

  constructor() {
    this.dice = new Dice();
    this.round = 0;
    this.heros = [];
    this.heros.push(new Player(1, 5, 3, this.generateSkin(false, this.dice))); //TEMP
    this.heros.push(new Player(1, 7, 2, this.generateSkin(false, this.dice))); //TEMP
    this.heros.push(new Player(1, 9, 3, this.generateSkin(false, this.dice))); //TEMP
    this.heros.push(new Player(1, 7, 7, this.generateSkin(false, this.dice))); //TEMP

    this.monsters = [];
    this.monsters.push(new Player(1, 5, 3, this.generateSkin(true, this.dice))); //TEMP
    this.monsters.push(new Player(1, 7, 2, this.generateSkin(true, this.dice))); //TEMP
    this.monsters.push(new Player(1, 9, 3, this.generateSkin(true, this.dice))); //TEMP
    this.monsters.push(new Player(1, 7, 7, this.generateSkin(true, this.dice))); //TEMP
    this.battlefield = new Battlefield();
    this.monsterIndex = 0;
    this.heroIndex = 0;
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
    this.battlefield.fight(hero, monster)
    if (hero.lifepoints <= 0) {
      this.heros.splice(this.heroIndex, 1);
    } else if (monster.lifepoints <= 0) {
      this.monsters.splice(this.monsterIndex, 1);
    }
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

// Start app ###################################################################
var app = new Controller(new View(), new Model());
