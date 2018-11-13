const {Hero} = require('./../classes/hero.js');

/* eslint-disable-next-line require-await */
const newHero = async msg => ({
  status: 200,
  body: JSON.stringify(new Hero(JSON.parse(msg.body).name))
});

module.exports = {
  newHero
};
