const R = require('ramda');

const countVillainsInCities = R.pipe(
  R.map(R.prop('pos_')),
  R.countBy(R.identity),
  R.toPairs,
  R.sortBy(R.descend(R.prop(1))),
);

const countVillainsByCities = list => {
  list = countVillainsInCities(list);
  const count = [];
  list.forEach(element => {
    count.push({name: element[0], score: element[1]});
  });
  return count;
};

/* eslint-disable-next-line require-await */
const countVillainsByCitiesHandler = async msg => ({
  status: 200,
  body: JSON.stringify(countVillainsByCities(JSON.parse(msg.body)))
});

module.exports = {
  countVillainsByCitiesHandler
};
