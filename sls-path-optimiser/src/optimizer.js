const R = require('ramda');
const sa = require('shuffle-array');

const optimizePath = (cities, mounts, hero) => {
  const getCityByLabel = label => R.pipe(
    R.filter(x => x.name === label),
    R.head,
  )(cities);

  const distance = (a, b) => Math.sqrt(
    ((b.pos.x - a.pos.x) ** 2) + ((b.pos.y - a.pos.y) ** 2));

  const shuffle = array => sa(array, {copy: true});

  const mutateArray = array => R.map(potentialChange, array);

  const mutateValue = value => {
    const tab = R.filter(x => x !== value, R.map(R.prop('name'), cities));
    return tab[Math.floor(Math.random() * R.length(tab))];
  };

  const potentialChange = path => Math.random() > 0.7 ? mutateValue(path) :
    path;

  const computeSolution = R.curry((maxDistance, solutions) => {
    solutions.forEach(solution => {
      let i = 0;
      let distanceCounter = 0;
      solution.distanceTraveled = [];
      solution.score = 0;
      solution.mountsUsed = [];
      while ((i + 1) < solution.path.length && distanceCounter <=
      maxDistance) {
        const cityA = getCityByLabel(solution.path[i]);
        const cityB = getCityByLabel(solution.path[i + 1]);
        const mountsByNow = R.difference(mounts, solution.mountsUsed);
        const mountsOnCityA = R.filter(x => R.equals(x.pos, cityA.name),
          mountsByNow);
        solution.distanceTraveled.push(cityA.name);
        if (mountsOnCityA.length > 0) { // If there are mounts available
          distanceCounter += distance(cityA, cityB) / 4;
          solution.mountsUsed.push(R.head(mountsOnCityA));
        } else {
          distanceCounter += distance(cityA, cityB);
        }
        if (R.not(R.includes(cityA.name, R.slice(0, i, solution.path)))) {
          solution.score += cityA.score; // Avoid counting twice the score of a
          // city
        }
        i++;
      }
    });
    return solutions;
  });

  const getPercentOfArray_ = (list, percentage) => R.pipe(
    R.length,
    R.multiply(R.subtract(1, percentage)),
    Math.round,
    R.dropLast(R.__, list)
  )(list);

  const mutatePath = path => R.pipe(
    R.drop(1),
    mutateArray,
    R.insert(0, path[0])
  )(path);

  const optimiseParents = (parents, maxDistance) => {
    const children = R.pipe(R.map(x => ({
      path: mutatePath(x.path)
    })),
    computeSolution(maxDistance),
    R.sort((x, y) => y.score - x.score)
    )(parents);

    return R.sort((x, y) => y.score - x.score,
      R.concat(getPercentOfArray_(parents, 0.6),
        getPercentOfArray_(children, 0.4)));
  };

  const isAllSame = R.pipe(
    R.groupWith(R.equals),
    R.length,
    R.equals(1)
  );

  const generatePath = start => R.pipe(
    R.map(R.prop('name')),
    R.filter(x => x !== start),
    shuffle,
    R.insert(0, start),
  )(cities);

  const createParents = (numberOfParents, maxDistance) => R.pipe(
    R.range(0),
    R.map(() => ({
      path: generatePath(hero.pos)
    })),
    computeSolution(maxDistance),
    R.sort((x, y) => y.score - x.score)
  )(numberOfParents);

  const T = 3;
  const previousResultT2 = R.map(() => 0, R.range(0, T));

  const {iterationMax, iterationMin, maxDistance} = process.env;

  // Création des parents
  let parents = createParents(4, maxDistance);
  let i;
  for (i = 0; i < iterationMax; i++) {
    parents = optimiseParents(parents, maxDistance);
    previousResultT2[i % T] = R.prop('score', R.head(parents));
    if (isAllSame(previousResultT2) && i > iterationMin) {
      break;
    }
  }
  return R.head(parents);
};

module.exports = {optimizePath};
