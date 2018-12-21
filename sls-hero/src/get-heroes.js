const mongoose = require('mongoose');

const R = require('ramda');

const curryHeroes = R.curry((list, p) => {
  return {id: p._id, name: p.name_, pos: p.pos_};
});
const propHeroes = list => R.map(curryHeroes(list), list);

const filterPropsHeroes = R.pipe(propHeroes);

const getHeroes = async () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const heroSchema = require('../model/hero').schema;
  const HeroModel = mongoose.model('heroModel', heroSchema);
  const heroes = await HeroModel.find({moving_: false}).exec();
  return filterPropsHeroes(heroes);
};

const getHeroesAvailableHandler = async () => ({
  status: 200,
  body: JSON.stringify(await getHeroes())
});

module.exports = {
  getHeroesAvailableHandler
};
