/* eslint-disable-next-line import/no-unresolved */
const mongoose = require('mongoose');

const rp = require('request-promise');

const hookVillain = () => {
  rp({method: 'POST', uri: 'http://localhost:3000/hookVillain',
    json: true, body: {unitTime: 10}}).then(res => console.log(res));
};

const getVillains = async () => {
  await hookVillain();
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const villainSchema = require('../model/villain').schema;
  const VillainModel = mongoose.model('villainModel', villainSchema);
  return VillainModel.find((err, villains) => {
    if (err) {
      return console.error(err);
    }
    return villains;
  });
};

/* eslint-disable-next-line require-await */
const getVillainsHandler = async () => ({
  status: 200,
  body: JSON.stringify(await getVillains())
});

module.exports = {
  getVillainsHandler
};
