const mongoose = require('mongoose');

const {Villain} = require('./../classes/villain.js');

const addVillain = async name => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const villainSchema = require('./../models/villain').schema;
  const VillainModel = mongoose.model('villainModel', villainSchema);
  await new VillainModel(new Villain(name)).save();
  return 'OK';
};

/* eslint-disable-next-line require-await */
const newVillain = async msg => ({
  status: 200,
  body: JSON.stringify(await addVillain(JSON.parse(msg.body).name))
});

module.exports = {
  newVillain
};
