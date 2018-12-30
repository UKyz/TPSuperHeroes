const mongoose = require('mongoose');

const R = require('ramda');

const {hookMount} = require('./hook-mounts');

const filter = R.map(x => ({id: x._id, pos: x._position}));

const getMounts = async () => {
  await hookMount(10);
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const mountSchema = require('../model/mount').schema;
  const MountModel = mongoose.model('mountModel', mountSchema);
  const mounts = await MountModel.find({}).exec();
  return filter(mounts);
};

const getMountsAvailableHandler = async () => ({
  status: 200,
  body: JSON.stringify(await getMounts())
});

module.exports = {
  getMountsAvailableHandler
};
