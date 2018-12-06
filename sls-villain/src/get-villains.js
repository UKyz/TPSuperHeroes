/* eslint-disable-next-line import/no-unresolved */
const mongoose = require('mongoose');

/* -- const hookVillain = unitTime => {
  const duration =
    moment.duration(moment(updateVillain).diff(moment()));
  const nbSeconds = (-duration.seconds());
  if (nbSeconds > unitTime) {
    let timeFactor = Math.trunc(nbSeconds / unitTime);
    const timeLess = nbSeconds - (unitTime * timeFactor);
    updateVillain = moment().subtract(timeLess, 'seconds');
    while (timeFactor > 0) {
      newVillain('Test');
      timeFactor -= 1;
    }
  }
}; */

const getVillains = () => {
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
