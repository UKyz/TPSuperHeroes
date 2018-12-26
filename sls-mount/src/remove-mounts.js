const mongoose = require('mongoose');

const removeMounts = mountToDelete => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const mountSchema = require('../model/mount').schema;
  const MountModel = mongoose.model('mountModel', mountSchema);
  return MountModel.remove({_id: {$in: mountToDelete}},
    (err, mounts) => {
      if (err) {
        return console.error(err);
      }
      return mounts;
    });
};

const removeMountsHandler = async () => ({
  status: 200,
  body: JSON.stringify(await removeMounts())
});

module.exports = {
  removeMountsHandler
};
