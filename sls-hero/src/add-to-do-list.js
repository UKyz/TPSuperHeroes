const mongoose = require('mongoose');

const addTicket = async ticket => {
  console.log('addTicket : ');
  console.log(ticket);
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const toDoListSchema = require('../model/to-do-list').schema;
  const ToDoListModel = mongoose.model('toDoListModel', toDoListSchema);
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
