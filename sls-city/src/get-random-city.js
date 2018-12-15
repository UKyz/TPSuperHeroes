const mongoose = require('mongoose');

const getRandomCity = async () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const citySchema = require('../model/city').schema;
  const CityModel = mongoose.model('cityModel', citySchema);
  const listCities = await CityModel.find({}).exec();
  const random = Math.floor(Math.random() * Math.floor(listCities.length));
  return listCities[random].name_;
};

/* eslint-disable-next-line require-await */
const getRandomCityHandler = async () => ({
  status: 200,
  body: JSON.stringify(await getRandomCity())
});

module.exports = {
  getRandomCityHandler
};
