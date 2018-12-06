/* eslint-disable-next-line import/no-unresolved */
const mongoose = require('mongoose');

const getMounts = () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const mountSchema = require('../model/mount').schema;
  const MountModel = mongoose.model('mountModel', mountSchema);
  return MountModel.find({pos_: {$not: /move/i}},
    (err, mounts) => {
      if (err) {
        return console.error(err);
      }
      return mounts;
    });
};

/* eslint-disable-next-line require-await */
const getMountsAvailableHandler = async () => ({
  status: 200,
  body: JSON.stringify(await getMounts())
});

module.exports = {
  getMountsAvailableHandler
};
