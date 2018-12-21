class City {
  constructor(name, lat, long) {
    this.name_ = name || 'UNKCITY';
    this.latitude_ = lat || 0;
    this.longitude_ = long || 0;
  }

  get name() {
    return this.name_;
  }
}

module.exports = {City};
