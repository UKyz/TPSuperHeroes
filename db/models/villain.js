const mongoose = require('mongoose');

const {Schema} = mongoose;

const villainSchema = new Schema({
  name: String
});

module.exports = {
  schema: villainSchema
};
