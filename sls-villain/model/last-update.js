/* eslint-disable-next-line import/no-unresolved */
const mongoose = require('mongoose');

const {Schema} = mongoose;

const lastUpdateVillainSchema = new Schema({
  date_: String
});

module.exports = {
  schema: lastUpdateVillainSchema
};
