class Hero {
  constructor(hero) {
    this.name_ = hero.name || 'UNKHERO';
    this.speed_ = 0;
    this.pos_ = hero.city || 'Paris';
    this.score_ = 0;
    this.moving_ = false;
  }

  get name() {
    return this.name_;
  }

  get speed() {
    return this.speed_;
  }

  get position() {
    return this.pos_;
  }

  get score() {
    return this.score_;
  }

  changePosition(position) {
    this.pos_ = position;
  }

  noPainNoGain(gain) {
    this.score_ += gain;
  }

  setSpeed(speed) {
    this.speed_ = speed;
  }
}

module.exports = {Hero};
