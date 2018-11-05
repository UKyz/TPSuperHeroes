const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const villainSchema = new Schema({
  name: String,
  superSkill: String
});

module.exports = {
  schema: villainSchema,
  model: mongoose.model('Villain', villainSchema),
  registry: {
    urlTemplates: {
      self: `${process.env.BASE_URL}/villain/{id}`,
      relationship: `${process.env.BASE_URL}/villain/${process.env.SUFFIX_URL}`
    }
  }
};
