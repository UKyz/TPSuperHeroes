const {City} = require('./../classes/city.js');

/* eslint-disable-next-line require-await */
const newCity = async msg => ({
  status: 200,
  body: JSON.stringify(new City(JSON.parse(msg.body).name))
});

module.exports = {
  newCity
};
