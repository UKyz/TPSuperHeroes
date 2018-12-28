const mongoose = require('mongoose');

const {Hero} = require('../class/hero.js');

const installHero = () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const heroSchema = require('../model/hero').schema;
  const HeroModel = mongoose.model('heroModel', heroSchema);
  const hero1 = new Hero({name: 'Robin'});
  return new HeroModel(hero1).save();
};

const getHeroes = async () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const citySchema = require('../model/hero').schema;
  const HeroModel = mongoose.model('heroModel', citySchema);
  const listHeroes = await HeroModel.find({}).exec();
  return (listHeroes.length !== 0);
};

const checkHeroes = async () => {
  if (await getHeroes() === false) {
    await installHero();
  }
  return 'OK';
};

const installHeroHandler = async () => ({
  status: 200,
  body: JSON.stringify(await checkHeroes())
});

module.exports = {
  installHeroHandler
};
