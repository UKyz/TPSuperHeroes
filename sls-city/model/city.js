const mongoose = require('mongoose');

const {Schema} = mongoose;

const citySchema = new Schema({
  name_: String,
  latitude_: Number,
  longitude_: Number
});

module.exports = {
  schema: citySchema
};
