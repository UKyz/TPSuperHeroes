const express = require('express');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  res.status(200).send({result: 3});
});

const getListCities = () => {
  // Requête Get pour chopper liste de tous les villains
  // Garder seulement ville et nombre de méchant
  // Trier et garder seulment les villes dans l'ordre décroissant du nombre de
  // méchant
};

const getListAvailableHeroes = () => {
  // Requête Get pour chopper liste de tous les héros qui ne sont pas en
  // déplacement (where hero.pos_ ne contient pas le mot déplacement)
};

const getListMovesHeroes = listCities => {
  console.log(listCities);
  // Fonction d'opti
  // Choppe les héros available
  const listAvailableHeroes = getListAvailableHeroes();
  listAvailableHeroes.forEach(hero => {
    console.log(hero);
    // Récupère les coordonnées de hero.position
    // Calculer la distance en km entre les deux positions
  });
};

setInterval(() => {
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
}, 20000);

app.listen(3020);
