const sub = ({a, b}) => a - b;

/* eslint-disable-next-line require-await */
const subHandler = async msg => ({
  status: 200,
  body: JSON.stringify(sub(JSON.parse(msg.body)))
});

module.exports = {
  subHandler
};
