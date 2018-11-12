const mongoose = require('mongoose');

mongoose.connect(process.env.DB, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  /* --- Heroes --- */

  const heroSchema = require('./models/hero').schema;

  heroSchema.methods.info = function () {
    const greeting = `Name : ${this.name}`;
    console.log(greeting);
  };

  const HeroModel = mongoose.model('heroModel', heroSchema);

  const superman = new HeroModel({name: 'Superman'});
  superman.info();

  /* --- Villain --- */

  const villainSchema = require('./models/villain').schema;

  villainSchema.methods.info = function () {
    const greeting = `Name : ${this.name}`;
    console.log(greeting);
  };

  const VillainModel = mongoose.model('villainModel', villainSchema);

  const maxime = new VillainModel({name: 'Maxime le Maudit'});
  maxime.info();

  /* --- City --- */

  const citySchema = require('./models/city').schema;

  citySchema.methods.info = function () {
    const greeting = `Name : ${this.name}`;
    console.log(greeting);
  };

  const CityModel = mongoose.model('cityModel', citySchema);

  const paris = new CityModel({name: 'Paris'});
  paris.info(); // "Meow name is fluffy"

  /* fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  }); */
});
