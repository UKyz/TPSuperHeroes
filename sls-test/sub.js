const sub = ({a, b}) => a - b;

const subHandler = msg => ({
  status: 200,
  body: JSON.stringify(sub(JSON.parse(msg.body)))
});

module.exports = {
  subHandler
};
