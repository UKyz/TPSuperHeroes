const mongoose = require('mongoose');

const {Schema} = mongoose;

const citySchema = new Schema({
  name_: String,
  longitude_: Number,
  latitude_: Number
});

module.exports = {
  schema: citySchema
};
