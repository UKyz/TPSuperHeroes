const mongoose = require('mongoose');

const {Schema} = mongoose;

const villainSchema = new Schema({
  name_: String,
  speed_: Number,
  pos_: String,
  score_: Number
});

module.exports = {
  schema: villainSchema
};
