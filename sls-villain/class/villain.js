class Villain {
  constructor(name, city) {
    this.name_ = name || 'UNKHERO';
    this.speed_ = 0;
    this.pos_ = city || 'Paris';
    this.score_ = 0;
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
}

module.exports = {Villain};
