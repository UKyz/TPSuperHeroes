const mongoose = require('mongoose');

const {hookMount} = require('./hook-mounts');

const getMounts = async () => {
  await hookMount(10);
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const mountSchema = require('../model/mount').schema;
  const MountModel = mongoose.model('mountModel', mountSchema);
  return MountModel.find({}).exec();
};

const getMountsAvailableHandler = async () => ({
  status: 200,
  body: JSON.stringify(await getMounts())
});

module.exports = {
  getMountsAvailableHandler
};
