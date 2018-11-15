class Mount {
  constructor(name, speed, pos, endurance) {
    this.name_ = name || 'Tornado';
    this.speed_ = speed || 50;
    this.pos_ = pos || 'Paris';
    this.endurance_ = endurance || 100;
  }

  get name() {
    return this.name_;
  }

  get speed() {
    return this.speed_;
  }

  get pos() {
    return this.pos_;
  }

  set pos(value) {
    this.pos_ = value;
  }

  get endurance() {
    return this.endurance_;
  }

  set endurance(value) {
    this.endurance_ = value;
  }
}

module.exports = {Mount};
