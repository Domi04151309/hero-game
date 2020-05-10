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
