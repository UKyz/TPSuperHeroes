const {Mount} = require('./../classes/mount.js');

/* eslint-disable-next-line require-await */
const newMount = async msg => ({
  status: 200,
  body: JSON.stringify(new Mount(JSON.parse(msg.body).name))
});

module.exports = {
  newMount
};
