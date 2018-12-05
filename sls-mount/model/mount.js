const mongoose = require('mongoose');

const {Schema} = mongoose;

const mountSchema = new Schema({
  _HP: Number,
  _inUse: Boolean,
  _position: String
});

module.exports = {
  schema: mountSchema
};
