class View {

  constructor() {
    this.log = document.getElementById("log");
    this.lbl1 = document.getElementById("round");
    this.lbl3 = document.getElementById("heroLifes");
    this.lbl5 = document.getElementById("monsterLifes");
    this.scrollbox1 = document.getElementById("heros");
    this.scrollbox2 = document.getElementById("monsters");
    this.lbl8 = document.getElementById("selectedMonster");
    this.lbl9 = document.getElementById("selectedHero");
    this.btn4 = document.getElementById("run");

    this.winner = document.getElementById("winner");
    this.winnerIcon = document.getElementById("winnerIcon");
    this.winningTeam = document.getElementById("winningTeam");
    this.reload = document.getElementById("reload");
  }
}
