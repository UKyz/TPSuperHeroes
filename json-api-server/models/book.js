const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bookSchema = new Schema({
  author: {type: ObjectId, ref: 'Author'},
  title: String
});

module.exports = {
  schema: bookSchema,
  model: mongoose.model('Book', bookSchema),
  registry: {
    urlTemplates: {
      self: `${process.env.BASE_URL}/book/{id}`,
      relationship: `${process.env.BASE_URL}/book/${process.env.SUFFIX_URL}`
    }
  }
};
