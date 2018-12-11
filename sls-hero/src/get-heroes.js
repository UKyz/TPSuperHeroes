const mongoose = require('mongoose');

const getHeroes = () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const heroSchema = require('../model/hero').schema;
  const HeroModel = mongoose.model('heroModel', heroSchema);
  return HeroModel.find({pos_: {$not: /move/i}},
    (err, heroes) => {
      if (err) {
        return console.error(err);
      }
      return heroes;
    });
};

/* eslint-disable-next-line require-await */
const getHeroesAvailableHandler = async () => ({
  status: 200,
  body: JSON.stringify(await getHeroes())
});

module.exports = {
  getHeroesAvailableHandler
};
