const mongoose = require('mongoose');

const {Villain: NewVillain} = require('../class/villain.js');

const addVillain = async name => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const villainSchema = require('../model/villain').schema;
  const VillainModel = mongoose.model('villainModel', villainSchema);
  await new VillainModel(new NewVillain(name)).save();
  return 'OK';
};

const addVillainHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await addVillain(JSON.parse(msg.body).name))
});

module.exports = {
  addVillainHandler
};
