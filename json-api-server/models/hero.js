const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const heroSchema = new Schema({
  name: String,
  superSkill: String,
});

module.exports = {
  schema: heroSchema,
  model: mongoose.model('Hero', heroSchema),
  registry: {
    urlTemplates: {
      self: `${process.env.BASE_URL}/hero/{id}`,
      relationship: `${process.env.BASE_URL}/hero/${process.env.SUFFIX_URL}`
    }
  }
};
