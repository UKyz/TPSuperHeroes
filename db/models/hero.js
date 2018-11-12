const mongoose = require('mongoose');

const {Schema} = mongoose;

const heroSchema = new Schema({
  name: String
});

module.exports = {
  schema: heroSchema
};
