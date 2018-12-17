const mongoose = require('mongoose');

const {Schema} = mongoose;

const lastUpdateHeroSchema = new Schema({
  idHero_: String,
  date_: String
});

module.exports = {
  schema: lastUpdateHeroSchema
};
