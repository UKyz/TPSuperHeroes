const mongoose = require('mongoose');

const rp = require('request-promise');

const {Villain: NewVillain} = require('../class/villain.js');

const getRandomCity = () => {
  return new Promise(resolve => {
    console.log('Random Villain');
    resolve(rp({method: 'GET', uri:
        `${process.env.SLS_CITY}/getRandomCity`, json: true}));
  });
};

const newVillain = (name, city) => {
  return new Promise(resolve => {
    mongoose.connect(process.env.DB, {useNewUrlParser: true});
    const villainSchema = require('../model/villain').schema;
    const VillainModel = mongoose.model('villainModel', villainSchema);
    resolve(new VillainModel(new NewVillain(name, city)).save());
  });
};

const addVillain = objVillain => {
  if (!Object.prototype.hasOwnProperty.call(objVillain, 'city')) {
    return getRandomCity().then(city => {
      newVillain(objVillain.name, city);
    });
  }
  return newVillain(objVillain.name, objVillain.city);
};

const addVillainHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await addVillain(JSON.parse(msg.body)))
});

module.exports = {
  addVillainHandler
};
