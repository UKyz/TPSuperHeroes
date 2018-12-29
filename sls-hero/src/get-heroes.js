const mongoose = require('mongoose');

const R = require('ramda');

const {hookHero} = require('./hook-hero');

const curryHeroes = R.curry((list, p) => {
  return {id: p._id, name: p.name_, pos: p.pos_, speed: p.speed_};
});
const propHeroes = list => R.map(curryHeroes(list), list);
const filterPropsHeroes = R.pipe(propHeroes);

const getHeroes = async () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const heroSchema = require('../model/hero').schema;
  const HeroModel = mongoose.model('heroModel', heroSchema);
  let heroes = await HeroModel.find({}).exec();
  heroes.forEach(async hero => {
    await hookHero(hero._id);
  });
  heroes = await HeroModel.find({moving_: false}).exec();
  return filterPropsHeroes(heroes);
};

const getHeroesAvailableHandler = async () => ({
  status: 200,
  body: JSON.stringify(await getHeroes())
});

module.exports = {
  getHeroesAvailableHandler
};
