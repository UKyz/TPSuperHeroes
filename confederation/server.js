const express = require('express');

const rp = require('request-promise');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/test', async (req, res) => {
  await getListMovesHeroes(await getListCities());
  res.status(200).send('OK');
});

const getListCities = () => {
  return rp({uri: `${process.env.API_DB}/getListCitiesVillains`,
    json: true});
};

const getListAvailableHeroes = () => {
  return rp(
    {method: 'GET', uri: `${process.env.API_DB}/getListAvailableHeroes`});
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

/* --setInterval(() => {
  const listCityVillain = getListCities();
  listCityVillain.forEach(city => {
    console.log(city);
    // Récuperer les coordonnées de la city
    const listMovesHeroes = getListMovesHeroes();
    listMovesHeroes.forEach(elm => {
      console.log(elm);
      // Créer un timeout pour dire qu'il est arrivé grace à elm.timeMove
    });
  });
}, 20000); */

app.listen(process.env.PORT);
