const mongoose = require('mongoose');

const {Hero} = require('../class/hero.js');

const addHero = async name => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const heroSchema = require('../model/hero').schema;
  const HeroModel = mongoose.model('heroModel', heroSchema);
  await new HeroModel(new Hero(name)).save();
  return 'OK';
};

const addHeroHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await addHero(JSON.parse(msg.body).name))
});

module.exports = {
  addHeroHandler
};
