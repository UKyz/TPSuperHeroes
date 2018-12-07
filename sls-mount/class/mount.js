class Mount {
  constructor(position) {
    this._position = position;
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
  }
}

module.exports = {Mount};
