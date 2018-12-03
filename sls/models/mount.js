const mongoose = require('mongoose');

const {Schema} = mongoose;

const mountSchema = new Schema({
  name_: String,
  speed_: Number,
  pos_: String,
  endurance_: Number
});

module.exports = {
  schema: mountSchema
};
