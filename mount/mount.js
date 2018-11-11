class Mount {
  constructor(name = 'Tornado', speed = 50, pos = 'Paris', endurance = 100) {
    this._name = name;
    this._speed = speed;
    this._pos = pos;
    this._endurance = endurance;
  }

  get name() {
    return this._name;
  }

  get speed() {
    return this._speed;
  }

  get pos() {
    return this._pos;
  }

  set pos(value) {
    this._pos = value;
  }

  get endurance() {
    return this._endurance;
  }

  set endurance(value) {
    this._endurance = value;
  }
}

module.exports = {Mount};
