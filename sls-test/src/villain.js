const {Villain} = require('./../classes/villain.js');

/* eslint-disable-next-line require-await */
const newVillain = async msg => ({
  status: 200,
  body: JSON.stringify(new Villain(JSON.parse(msg.body).name))
});

module.exports = {
  newVillain
};
