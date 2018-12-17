const mongoose = require('mongoose');

const deleteVillain = async city => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const villainSchema = require('../model/villain').schema;
  const VillainModel = mongoose.model('villainModel', villainSchema);
  console.log(city);
  let nbDelete = 0;
  await VillainModel.deleteMany({pos_: city}, (err, res) => {
    if (err) {
      return console.error(err);
    }
    nbDelete = res.n;
  });
  return {nbVillainsDeleted: nbDelete};
};

const deleteVillainsHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await deleteVillain(JSON.parse(msg.body).city))
});

module.exports = {
  deleteVillainsHandler
};
