const R = require('ramda');

const calcWeight = R.curry((list, p) => {
  return {name: p[0], score: p[1]};
});
const mapCities = list => R.map(calcWeight(list), list);

const countVillainsByCities = R.pipe(
  R.map(R.prop('pos_')),
  R.countBy(R.identity),
  R.toPairs,
  mapCities,
);

const countVillainsByCitiesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(await countVillainsByCities(JSON.parse(msg.body)))
});

module.exports = {
  countVillainsByCitiesHandler
};
