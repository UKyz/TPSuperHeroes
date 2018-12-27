const mongoose = require('mongoose');

const R = require('ramda');

const {hookHero} = require('./hook-hero');

const getHero = hero => ({
  name: hero.name_,
  pos: hero.pos_,
  speed: hero.speed_,
  score: hero.score_,
  moving: hero.moving_
});

const filterPropsHeroes = list => R.map(getHero, list);

const getHeroes = async () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const heroSchema = require('../model/hero').schema;
  const HeroModel = mongoose.model('heroModel', heroSchema);
  let heroes = await HeroModel.find({}).exec();
  heroes.forEach(async hero => {
    await hookHero(hero._id);
  });
  heroes = await HeroModel.find({}).exec();
  return filterPropsHeroes(heroes);
};

const getHeroesAvailableHandlerForFront = async () => ({
  status: 200,
  body: JSON.stringify(await getHeroes())
});

module.exports = {
  getHeroesAvailableHandlerForFront
};
