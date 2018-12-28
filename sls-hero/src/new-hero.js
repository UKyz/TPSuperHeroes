const mongoose = require('mongoose');

const {Hero} = require('../class/hero.js');

const addHero = objHero => {
  if (!Object.prototype.hasOwnProperty.call(objHero, 'city')) {
    objHero.city = 'Paris';
  }
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const heroSchema = require('../model/hero').schema;
  const HeroModel = mongoose.model('heroModel', heroSchema);
  console.log(`Creation of ${objHero.name}`);
  return new HeroModel(new Hero(objHero)).save();
};

const addHeroHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await addHero(JSON.parse(msg.body)))
});

module.exports = {
  addHeroHandler
};
