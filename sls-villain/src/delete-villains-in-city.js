const mongoose = require('mongoose');

const deleteVillain = async city => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const villainSchema = require('../model/villain').schema;
  const VillainModel = mongoose.model('villainModel', villainSchema);
  const nbDelete = await VillainModel.deleteMany({pos_: city}).exec();
  console.log(`${nbDelete.n} villains had been killed in ${city}`);
  return {nbVillainsDeleted: nbDelete.n};
};

const deleteVillainsHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await deleteVillain(JSON.parse(msg.body).city))
});

module.exports = {
  deleteVillainsHandler
};
