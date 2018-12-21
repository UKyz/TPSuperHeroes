const mongoose = require('mongoose');

const getCities = () => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const citySchema = require('../model/city').schema;
  const CityModel = mongoose.model('cityModel', citySchema);
  return CityModel.find({}).exec();
};

const getCitiesHandler = async () => ({
  status: 200,
  body: JSON.stringify(await getCities())
});

module.exports = {
  getCitiesHandler
};
