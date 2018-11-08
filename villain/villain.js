class Villain {
  constructor(name) {
    this.name_ = name || 'UNKHERO';
    this.speed_ = 0;
    this.pos_ = 'Paris';
    this.score_ = 0;
  }

  get name() {
    return this.name_;
  }

  changePosition(position) {
    this.position_ = position;
  }

  noPainNoGain(gain) {
    this.score_ += gain;
  }

  setSpeed(speed) {
    this.speed_ = speed;
  }
}

module.exports = {Villain};
