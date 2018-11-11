const add = ({a, b}) => a + b;

/* eslint-disable-next-line require-await */
const addHandler = async msg => ({
  status: 200,
  body: JSON.stringify(add(JSON.parse(msg.body)))
});

module.exports = {
  addHandler
};
