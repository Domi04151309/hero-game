class Controller {

  constructor(viewToUse, modelToUse) {
    this.view = viewToUse;
    this.model = modelToUse;
    this.view.btn4.addEventListener("click", this.btn1Pressed.bind(this));
    this.view.reload.addEventListener("click", this.reloadPressed.bind(this));
    this.updateView();
  }

  updateView() {
    this.view.scrollbox1.innerHTML = this.model.getHerosCondition();
    this.view.scrollbox2.innerHTML = this.model.getMonstersCondition();
    this.view.lbl3.innerHTML = this.model.getHerosLifepoints();
    this.view.lbl5.innerHTML = this.model.getMonstersLifepoints();

    if (this.model.getHerosLifepoints() == 0) {
      this.end();
      this.view.scrollbox2.childNodes[this.model.monsterIndex].classList.add("selected");
      this.view.lbl9.innerHTML = this.model.emptyCondition;
      this.view.winnerIcon.src = "./images/bad_omen.png"
      this.view.winningTeam.innerHTML = "monsters"
    } else if (this.model.getMonstersLifepoints() == 0) {
      this.end();
      this.view.scrollbox1.childNodes[this.model.heroIndex].classList.add("selected");
      this.view.lbl8.innerHTML = this.model.emptyCondition;
      this.view.winnerIcon.src = "./images/hero_of_the_village.png"
      this.view.winningTeam.innerHTML = "heros"
    } else {
      this.view.lbl1.innerHTML = this.model.round;
      this.view.scrollbox1.childNodes[this.model.heroIndex].classList.add("selected");
      this.view.scrollbox2.childNodes[this.model.monsterIndex].classList.add("selected");
      this.view.lbl8.innerHTML = this.model.monsters[this.model.monsterIndex].getCondition();
      this.view.lbl9.innerHTML = this.model.heros[this.model.heroIndex].getCondition();
    }
  }

  end() {
    this.view.btn4.disabled = true;
    this.view.btn4.classList.add("disabled");
    this.view.winner.classList.remove("hidden");
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

  reloadPressed() {
    location.reload();
  }
}
