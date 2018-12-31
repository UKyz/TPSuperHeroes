const mongoose = require('mongoose');

const {Schema} = mongoose;

const heroSchema = new Schema({
  name_: String,
  speed_: Number,
  pos_: String,
  score_: Number,
  moving_: Boolean,
  isMovingWithAMount_: Boolean
});

module.exports = {
  schema: heroSchema
};
