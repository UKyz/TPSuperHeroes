const mongoose = require('mongoose');

const {City} = require('../class/city.js');

const installCities = async () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const citySchema = require('../model/city').schema;
  const CityModel = mongoose.model('cityModel', citySchema);
  const tabCities = [
    new City('Paris', '48.86', '2.35'),
    new City('Lille', '50.63', '3.06'),
    new City('Brest', '48.39', '-4.49'),
    new City('Lyon', '45.76', '4.84'),
    new City('Toulouse', '43.60', '1.44'),
    new City('Marseille', '43.30', '5.37'),
    new City('Strasbourg', '48.57', '7.75'),
    new City('Nantes', '47.22', '-1.55'),
    new City('Bordeaux', '44.84', '-0.58'),
    new City('Montpellier', '48.57', '7.75')
  ];
  tabCities.forEach(async element => {
    await new CityModel(element).save();
  });
};

const getCities = async () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const citySchema = require('../model/city').schema;
  const CityModel = mongoose.model('cityModel', citySchema);
  const listCities = await CityModel.find({}).exec();
  /* If (listCities.length === 0) {
    return false;
  }
  return true; */
  return (listCities.length !== 0);
};

const checkCities = async () => {
  if (await getCities() === false) {
    await installCities();
  }
  return 'OK';
};

const installCitiesHandler = async () => ({
  status: 200,
  body: JSON.stringify(await checkCities())
});

module.exports = {
  installCitiesHandler
};
