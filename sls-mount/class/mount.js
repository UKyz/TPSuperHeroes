class Mount {
  constructor(position) {
    this._HP = 100;
    this._inUse = false;
    this._position = position;
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
  }

  get HP() {
    return this._HP;
  }

  set HP(value) {
    this._HP = value;
  }

  get inUse() {
    return this._inUse;
  }

  set inUse(value) {
    this._inUse = value;
  }
}

module.exports = {Mount};
