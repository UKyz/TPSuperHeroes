const mongoose = require('mongoose');

const {Mount} = require('../class/mount.js');

const addMount = async position => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const mountSchema = require('../model/mount').schema;
  const MountModel = mongoose.model('mountModel', mountSchema);
  await new MountModel(new Mount(position)).save();
  return 'OK';
};

const addMountHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await addMount(JSON.parse(msg.body).name))
});

module.exports = {
  addMountHandler
};
