const express = require('express');

const rp = require('request-promise');

const bodyParser = require('body-parser');

const R = require('ramda');

const moment = require('moment');

const app = express();
app.use(bodyParser.json());

app.get('/test', async (req, res) => {
  console.log('->>>>> Test');
  await getListCities();
  res.status(200).send('OK');
});

const getListCities = async () => {
  const listVillains = await rp({uri: `${process.env.SLS_VILLAIN}/getVillains`,
    json: true});
  const villainsByCities = await rp({method: 'POST', uri:
      `${process.env.SLS_VILLAIN}/countVillainsByCities`, json: true, body:
    listVillains});

  const keepName = R.pipe(R.map(R.prop('name')));
  const citiesPos = await rp({method: 'POST', uri:
      `${process.env.SLS_CITY}/getCitiesPos`, json: true, body:
      await keepName(villainsByCities)});

  villainsByCities.forEach(villain => {
    citiesPos.forEach(city => {
      if (villain.name === city.name) {
        villain.pos = {x: city.latitude, y: city.longitude};
      }
    });
  });
  return villainsByCities;
};

const getListAvailableHeroes = () => {
  return rp(
    {method: 'GET', uri: `${process.env.SLS_HERO}/getHeroes`});
};

const installCities = () => {
  return rp(
    {method: 'POST', uri: `${process.env.SLS_CITY}/installCities`});
};

const installHero = () => {
  return rp(
    {method: 'POST', uri: `${process.env.SLS_HERO}/installHero`});
};

const manageMovesHeroes = async (listCities, listHeroes) => {
  let now = moment();
  const optimisePath = await getOptimisePath(listCities,
    listHeroes[0], []);
  optimisePath.distanceTraveled.forEach(city => {
    now = moment(now).add(10, 'ms');
    rp({method: 'POST', uri: `${process.env.SLS_HERO}/addTicket`, json: true,
      body: {
        idHero_: optimisePath.idHero,
        idCity_: city.id,
        duration_: city.duration,
        dateCreation_: now.format('YYYY-MM-DD HH:mm:ss:SS')
      }
    });
  });
};

const getOptimisePath = async (cities, hero, mounts) => {
  return rp(
    {method: 'POST', uri: `${process.env.SLS_HERO}/installHero`, json: true,
      body: {cities, hero, mounts}});
  /* -- return {
    idHero: '5c1a25bdc0a259001b6e01f8',
    distanceTraveled: [
      {id: '5c1a25bcea43f3001b75889f', name: "Brest", duration: 50},
      {id: '5c1a25bcea43f3001b7588a0', name: "Lyon", duration: 200}
    ],
    score: 15,
    mountsUsed: []
  }; */
};

const main = () => {
  setInterval(async () => {
    const listAvailableHeroes = await getListAvailableHeroes();
    if (listAvailableHeroes.length > 0) {
      const listCityVillain = await getListCities();
      await manageMovesHeroes(listCityVillain, listAvailableHeroes);
    }
  }, 10000);
};

setTimeout(async () => {
  console.log('Let\'s go !');
  console.log(`Installation cities : ${await installCities()}`);
  console.log(`Installation hero : ${await installHero()}`);
  main();
}, 20000);

app.listen(process.env.PORT);
