const mongoose = require('mongoose');

const {Schema} = mongoose;

const lastUpdateMountSchema = new Schema({
  date_: String
});

module.exports = {
  schema: lastUpdateMountSchema
};
