const mongoose = require('mongoose');

const moment = require('moment');

const rp = require('request-promise');

const newVillain = name => {
  rp({method: 'POST', uri: 'http://localhost:3000/newVillain',
    json: true, body: {name}}).then(res => console.log(res));
};

const getLastUpdate = () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const lastUpdateSchema = require('../model/last-update').schema;
  const LastUpdateModel = mongoose.model('lastUpdateVillainModel',
    lastUpdateSchema);
  return LastUpdateModel.find({}).exec();
};

const computeNewUpdate = (lastUpdate, unitTime) => {
  let updateVillain = moment();
  if (lastUpdate[0] !== undefined) {
    updateVillain = moment(lastUpdate[0].date_);
    const nbSeconds =
      (-moment.duration(moment(updateVillain).diff(moment())).asSeconds());
    if (nbSeconds > unitTime) {
      let timeFactor = Math.trunc(nbSeconds / unitTime);
      const timeLess = nbSeconds - (unitTime * timeFactor);
      updateVillain = moment().subtract(timeLess, 'seconds');
      while (timeFactor > 0) {
        newVillain('Maxime');
        timeFactor -= 1;
      }
      return moment().subtract(timeLess, 'seconds');
    }
  }
  return updateVillain;
};

const hookVillain = async unitTime => {
  const updateVillain = computeNewUpdate(await getLastUpdate(), unitTime);
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const lastUpdateSchema = require('../model/last-update').schema;
  const LastUpdateModel = mongoose.model('lastUpdateVillainModel',
    lastUpdateSchema);
  await LastUpdateModel.deleteMany({});
  await new LastUpdateModel({date_: moment(updateVillain).format().toString()})
    .save();
  return 'OK';
};

module.exports = {
  hookVillain
};
