const mongoose = require('mongoose');

const {hookVillain} = require('./hook-villain');

const getVillains = async () => {
  await hookVillain(10);
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const villainSchema = require('../model/villain').schema;
  const VillainModel = mongoose.model('villainModel', villainSchema);
  return VillainModel.find({}).exec();
};

const getVillainsHandler = async () => ({
  status: 200,
  body: JSON.stringify(await getVillains())
});

module.exports = {
  getVillainsHandler
};
