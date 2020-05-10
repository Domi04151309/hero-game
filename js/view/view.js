export default class View {

  constructor() {
    this.log = document.getElementById("log");
    this.round = document.getElementById("round");
    this.heroLives = document.getElementById("heroLives");
    this.monsterLives = document.getElementById("monsterLives");
    this.heroScrollbox = document.getElementById("heros");
    this.monsterScrollbox = document.getElementById("monsters");
    this.selectedMonster = document.getElementById("selectedMonster");
    this.selectedHero = document.getElementById("selectedHero");
    this.run = document.getElementById("run");

    this.winner = document.getElementById("winner");
    this.winnerIcon = document.getElementById("winnerIcon");
    this.winningTeam = document.getElementById("winningTeam");
    this.reload = document.getElementById("reload");
  }
}
