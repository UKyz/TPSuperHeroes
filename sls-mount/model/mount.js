/* eslint-disable-next-line import/no-unresolved */
const mongoose = require('mongoose');

const {Schema} = mongoose;

const mountSchema = new Schema({
  _position: String
});

module.exports = {
  schema: mountSchema
};
