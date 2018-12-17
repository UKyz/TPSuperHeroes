const mongoose = require('mongoose');

const {Schema} = mongoose;

const toDoListSchema = new Schema({
  idHero_: String,
  idCity_: String,
  duration_: Number,
  dateCreation_: String
});

module.exports = {
  schema: toDoListSchema
};
