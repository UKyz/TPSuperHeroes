class City {
  constructor(name, lat, long) {
    this.name_ = name || 'UNKCITY';
    this.latitude_ = lat;
    this.longitude_ = long;
  }

  get name() {
    return this.name_;
  }

  get latitude() {
    return this.latitude_;
  }

  get longitude() {
    return this.longitude_;
  }
}

module.exports = {City};
