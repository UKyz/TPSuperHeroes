const mongoose = require('mongoose');

const getCity = idCity => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const citySchema = require('../model/city').schema;
  const CityModel = mongoose.model('cityModel', citySchema);
  return CityModel.findById(idCity).exec();
};

/* eslint-disable-next-line require-await */
const getCityHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await getCity(JSON.parse(msg.body).idCity))
});

module.exports = {
  getCityHandler
};
