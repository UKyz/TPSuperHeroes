const mongoose = require('mongoose');

const rp = require('request-promise');

const {Mount: NewMount} = require('../class/mount');

const getRandomCity = () => {
  return new Promise(resolve => {
    console.log('Random Villain');
    resolve(rp({method: 'GET', uri:
        `${process.env.SLS_CITY}/getRandomCity`, json: true}));
  });
};

const newMount = position => {
  return new Promise(resolve => {
    mongoose.connect(process.env.DB, {useNewUrlParser: true});
    const mountSchema = require('../model/mount').schema;
    const MountModel = mongoose.model('mountModel', mountSchema);
    resolve(new MountModel(new NewMount(position)).save());
  });
};

const addMount = objMount => {
  if (!Object.prototype.hasOwnProperty.call(objMount, 'pos')) {
    return getRandomCity().then(city => {
      newMount(city);
    });
  }
  return newMount(objMount.pos);
};

const addMountHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await addMount(JSON.parse(msg.body)))
});

module.exports = {
  addMountHandler
};
