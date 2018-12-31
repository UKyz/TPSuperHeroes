const mongoose = require('mongoose');

const R = require('ramda');

const {hookMount} = require('./hook-mounts');

const renameKeys = R.curry((keysMap, obj) =>
  R.reduce((acc, key) => R.assoc(keysMap[key] || key, obj[key], acc), {},
    R.keys(obj))
);

const filter = R.map(renameKeys({_id: 'city'}));

const getMountsPerCity = async () => {
  await hookMount(10);
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const mountSchema = require('../model/mount').schema;
  const MountModel = mongoose.model('mountModel', mountSchema);
  const mounts = await MountModel.aggregate([
    {$group: {_id: '$_position', count: {$sum: 1}}}
  ]).exec();
  return filter(mounts);
};

const getMountsPerCityeHandler = async () => ({
  status: 200,
  body: JSON.stringify(await getMountsPerCity())
});

module.exports = {
  getMountsPerCityeHandler
};
