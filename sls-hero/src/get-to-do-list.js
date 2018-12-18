const mongoose = require('mongoose');

const getTickets = idHero => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const toDoListSchema = require('../model/to-do-list').schema;
  const ToDoListModel = mongoose.model('toDoListModel', toDoListSchema);
  return ToDoListModel.find({idHero_: idHero},
    (err, tickets) => {
      if (err) {
        return console.error(err);
      }
      return tickets;
    }).sort({dateCreation_: 1});
};

const getTicketsHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await getTickets(JSON.parse(msg.body).idHero_))
});

module.exports = {
  getTicketsHandler,
  getTickets
};
