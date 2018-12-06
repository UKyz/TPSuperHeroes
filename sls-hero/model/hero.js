/* eslint-disable-next-line import/no-unresolved */
const mongoose = require('mongoose');

const {Schema} = mongoose;

const heroSchema = new Schema({
  name_: String,
  speed_: Number,
  pos_: String,
  score_: Number
});

module.exports = {
  schema: heroSchema
};
