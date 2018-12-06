const mongoose = require('mongoose');

const {City} = require('../class/city.js');

const addCity = async (name, lat, long) => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const citySchema = require('../model/city').schema;
  const CityModel = mongoose.model('cityModel', citySchema);
  await new CityModel(new City(name, lat, long)).save();
  return 'OK';
};

/* eslint-disable-next-line require-await */
const addCityHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await addCity(JSON.parse(msg.body).name,
    JSON.parse(msg.body).lat, JSON.parse(msg.body).long))
});

module.exports = {
  addCityHandler
};
