const express = require('express');

const rp = require('request-promise');

const bodyParser = require('body-parser');

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

  const cities = await rp({method: 'GET', uri:
      `${process.env.SLS_CITY}/getCities`, json: true});

  cities.forEach(city => {
    let hasVillain = false;
    villainsByCities.forEach(elm => {
      if (elm.name === city.name_) {
        hasVillain = true;
        elm.id = city._id;
        elm.pos = {x: city.latitude_, y: city.longitude_};
      }
    });
    if (!hasVillain) {
      villainsByCities.push({
        id: city._id,
        name: city.name_,
        score: 0,
        pos: {x: city.latitude_, y: city.longitude_}
      });
    }
  });

  return villainsByCities;
};

const getListAvailableHeroes = () => {
  return rp(
    {method: 'GET', uri: `${process.env.SLS_HERO}/getHeroes`, json: true});
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
  console.log('optimise res :');
  console.log(optimisePath);
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
  return rp({method: 'POST', uri: `${process.env.SLS_OPTI}/optimisePath`,
    json: true, body: {cities, hero, mounts}});
};

const main = () => {
  setInterval(async () => {
    const listAvailableHeroes = await getListAvailableHeroes();
    const listCityVillain = await getListCities();
    console.log('Test ici : ');
    console.log(listAvailableHeroes);
    console.log(listCityVillain);
    if (listAvailableHeroes.length > 0 && listCityVillain.length > 0) {
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
