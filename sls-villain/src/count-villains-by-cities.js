const R = require('ramda');

const countVillainsByCities = R.pipe(
  R.map(R.prop('pos_')),
  R.countBy(R.identity),
  R.toPairs,
  R.sortBy(R.descend(R.prop(1))),
);

/* eslint-disable-next-line require-await */
const countVillainsByCitiesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(countVillainsByCities(JSON.parse(msg.body)))
});

module.exports = {
  countVillainsByCitiesHandler
};
