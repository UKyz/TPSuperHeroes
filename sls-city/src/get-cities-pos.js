const mongoose = require('mongoose');

const getCitiesPos = async tab => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const citySchema = require('../model/city').schema;
  const CityModel = mongoose.model('cityModel', citySchema);
  const listCities = await CityModel.find({}).exec();
  const listCitiesPos = [];
  tab.forEach(element => {
    listCities.forEach(city => {
      if (element === city.name_) {
        listCitiesPos.push({
          name: city.name_,
          latitude: city.latitude_,
          longitude: city.longitude_
        });
      }
    });
  });
  return listCitiesPos;
};

const getCitiesPosHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await getCitiesPos(JSON.parse(msg.body)))
});

module.exports = {
  getCitiesPosHandler
};
