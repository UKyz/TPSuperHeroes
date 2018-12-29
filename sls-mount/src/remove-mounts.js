const mongoose = require('mongoose');

const removeMounts = mountToDelete => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const mountSchema = require('../model/mount').schema;
  const MountModel = mongoose.model('mountModel', mountSchema);
  return MountModel.remove({_id: {$in: mountToDelete}}).exec();
};

const removeMountsHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await removeMounts(JSON.parse(msg.body)))
});

module.exports = {
  removeMountsHandler
};
