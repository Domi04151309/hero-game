class Controller {

  constructor(viewToUse, modelToUse) {
    this.view = viewToUse;
    this.model = modelToUse;
    this.view.run.addEventListener("click", this.runPressed.bind(this));
    this.view.reload.addEventListener("click", this.reloadPressed.bind(this));
    this.updateView(MESSAGE_SOME_MONSTERS_APPEARED);
  }

  updateView(result) {
    this.view.heroScrollbox.innerHTML = this.model.getHerosCondition();
    this.view.monsterScrollbox.innerHTML = this.model.getMonstersCondition();
    this.view.heroLives.innerHTML = this.model.getHerosLifepoints();
    this.view.monsterLives.innerHTML = this.model.getMonstersLifepoints();
    this.view.log.innerHTML = result;

    if (this.model.getHerosLifepoints() == 0) {
      this.end();
      this.view.monsterScrollbox.childNodes[this.model.monsterIndex].classList.add("selected");
      this.view.selectedHero.innerHTML = this.model.emptyCondition;
      this.view.winnerIcon.src = "./images/bad_omen.png"
      this.view.winningTeam.innerHTML = "monsters"
    } else if (this.model.getMonstersLifepoints() == 0) {
      this.end();
      this.view.heroScrollbox.childNodes[this.model.heroIndex].classList.add("selected");
      this.view.selectedMonster.innerHTML = this.model.emptyCondition;
      this.view.winnerIcon.src = "./images/hero_of_the_village.png"
      this.view.winningTeam.innerHTML = "heros"
    } else {
      this.view.round.innerHTML = this.model.round;
      this.view.heroScrollbox.childNodes[this.model.heroIndex].classList.add("selected");
      this.view.monsterScrollbox.childNodes[this.model.monsterIndex].classList.add("selected");
      this.view.selectedMonster.innerHTML = this.model.monsters[this.model.monsterIndex].getCondition();
      this.view.selectedHero.innerHTML = this.model.heros[this.model.heroIndex].getCondition();
    }
  }

  end() {
    this.view.run.disabled = true;
    this.view.run.classList.add("disabled");
    this.view.winner.classList.remove("hidden");
  }

  changeHero(index) {
    this.model.setHero(index);
    var heros = this.view.heroScrollbox.childNodes;
    heros.forEach(hero => hero.classList.remove("selected"));
    heros[index].classList.add("selected");
    this.view.selectedHero.innerHTML = this.model.heros[index].getCondition();
  }

  runPressed() {
    var result = this.model.doFight()
    this.model.regenerateMonstersAndHeros();
    this.model.round++;
    this.model.newMonster()
    this.updateView(result);
  }

  reloadPressed() {
    location.reload();
  }
}
