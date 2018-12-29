const mongoose = require('mongoose');

const moment = require('moment');

const rp = require('request-promise');

const newMount = () => {
  rp({method: 'POST', uri: 'http://localhost:3000/newMount',
    json: true, body: {}});
};

const getLastUpdate = () => {
  return new Promise(resolve => {
    mongoose.connect(process.env.DB, {useNewUrlParser: true});
    const lastUpdateSchema = require('../model/last-update').schema;
    const LastUpdateModel = mongoose.model('lastUpdateMountModel',
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
    const LastUpdateModel = mongoose.model('lastUpdateMountModel',
      lastUpdateSchema);
    deleteLastUpdate(LastUpdateModel).then(() => {
      resolve(new LastUpdateModel({date_:
          moment(lastUpdate).format().toString()}).save());
    });
  });
};

const computeNewUpdate = (lastUpdate, unitTime) => {
  return new Promise(resolve => {
    let updateMount = moment();
    if (lastUpdate[0] !== undefined) {
      updateMount = moment(lastUpdate[0].date_);
      const nbSeconds =
        (-moment.duration(moment(updateMount).diff(moment())).asSeconds());
      if (nbSeconds > unitTime) {
        let timeFactor = Math.trunc(nbSeconds / unitTime);
        const timeLess = nbSeconds - (unitTime * timeFactor);
        updateMount = moment().subtract(timeLess, 'seconds');
        while (timeFactor > 0) {
          newMount();
          timeFactor -= 1;
        }
      }
    }
    resolve(updateMount);
  });
};

const hookMount = async unitTime => {
  getLastUpdate().then(lastUpdate => {
    computeNewUpdate(lastUpdate, unitTime).then(updateMount => {
      updateLastUpdate(updateMount);
    });
  });
  return 'OK';
};

module.exports = {
  hookMount
};
