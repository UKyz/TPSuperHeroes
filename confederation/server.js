const express = require('express');

const rp = require('request-promise');

const bodyParser = require('body-parser');

const R = require('ramda');

const app = express();
app.use(bodyParser.json());

app.get('/test', async (req, res) => {
  console.log('->>>>> Test');
  await getListMovesHeroes(await getListCities());
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

const getListMovesHeroes = async listCities => {
  console.log(`list Cities : ${listCities}`);
  // Choppe les héros available
  const listAvailableHeroes = await getListAvailableHeroes();
  console.log(`list Heroes: ${listAvailableHeroes}`);
  // Fonction d'opti
  /* -- listAvailableHeroes.forEach(hero => {
   console.log(hero);
   // Récupère les coordonnées de hero.position
   // Calculer la distance en km entre les deux positions
   }); */
};

const main = () => {
  setInterval(async () => {
    const listCityVillain = await getListCities();
    console.log('Test ici : ');
    console.log(listCityVillain);
    // Const listMovesHeroes = getListMovesHeroes();
  /* listCityVillain.forEach(city => {
      console.log(city);
      // Récuperer les coordonnées de la city
      const listMovesHeroes = getListMovesHeroes();
      listMovesHeroes.forEach(elm => {
        console.log(elm);
        // Créer un timeout pour dire qu'il est arrivé grace à elm.timeMove
      });
    }); */
  }, 10000);
};

setTimeout(async () => {
  console.log('Let\'s go !');
  console.log(`Installation cities : ${await installCities()}`);
  console.log(`Installation hero : ${await installHero()}`);
  main();
}, 20000);

app.listen(process.env.PORT);
