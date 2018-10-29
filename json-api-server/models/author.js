const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const authorSchema = new Schema({
  firstName: String,
  surName: String,
  bookList: [{type: ObjectId, ref: 'Book'}]
});

module.exports = {
  schema: authorSchema,
  model: mongoose.model('Author', authorSchema),
  registry: {
    urlTemplates: {
      self: `${process.env.BASE_URL}/author/{id}`,
      relationship: `${process.env.BASE_URL}/author/${process.env.SUFFIX_URL}`
    }
  }
};
