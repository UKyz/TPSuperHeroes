const mongoose = require('mongoose');

const moment = require('moment');

const addTicket = async ticket => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const toDoListSchema = require('../model/to-do-list').schema;
  const ToDoListModel = mongoose.model('toDoListModel', toDoListSchema);
  ticket.dateCreation_ = moment().format();
  await new ToDoListModel(ticket).save();
  return 'OK';
};

const addTicketHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await addTicket(JSON.parse(msg.body)))
});

module.exports = {
  addTicketHandler
};
