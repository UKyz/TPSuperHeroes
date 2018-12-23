const mongoose = require('mongoose');

const moment = require('moment');

const rp = require('request-promise');

const newVillain = name => {
  rp({method: 'POST', uri: 'http://localhost:3000/newVillain',
    json: true, body: {name}});
};

const getLastUpdate = () => {
  return new Promise(resolve => {
    mongoose.connect(process.env.DB, {useNewUrlParser: true});
    const lastUpdateSchema = require('../model/last-update').schema;
    const LastUpdateModel = mongoose.model('lastUpdateVillainModel',
      lastUpdateSchema);
    resolve(LastUpdateModel.find({}).exec());
  });
};

const deleteLastUpdate = LastUpdateModel => {
  return new Promise(resolve => {
    resolve(LastUpdateModel.deleteMany({}));
  });
};

const updateLastUpdate = lastUpdate => {
  return new Promise(resolve => {
    mongoose.connect(process.env.DB, {useNewUrlParser: true});
    const lastUpdateSchema = require('../model/last-update').schema;
    const LastUpdateModel = mongoose.model('lastUpdateVillainModel',
      lastUpdateSchema);
    deleteLastUpdate(LastUpdateModel).then(() => {
      resolve(new LastUpdateModel({date_:
          moment(lastUpdate).format().toString()}).save());
    });
  });
};

const computeNewUpdate = (lastUpdate, unitTime) => {
  return new Promise(resolve => {
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
      }
    }
    resolve(updateVillain);
  });
};

const hookVillain = async unitTime => {
  getLastUpdate().then(lastUpdate => {
    computeNewUpdate(lastUpdate, unitTime).then(updateVillain => {
      updateLastUpdate(updateVillain);
    });
  });
  return 'OK';
};

module.exports = {
  hookVillain
};
