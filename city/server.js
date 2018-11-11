/* eslint-disable-next-line import/no-unresolved */
const express = require('express');

const {City} = require('./city.js');

/* ---- express ---- */

const app = express();

const listCities = [
  new City('Lille', 3, 50),
  new City('Paris', 2, 48),
  new City('Brest', -4, 48),
  new City('Marseille', 5, 43),
  new City('Lyon', 5, 43),
  new City('Bordeaux', 0, 44),
  new City('Strasbourg', 7, 48),
  new City('Toulouse', 1, 43),
  new City('Montpellier', 3, 43)
];

app.get('/getListCities', (req, res) => {
  res.status(200).send({result: listCities});
});

app.get('/getLocalizationCity', (req, res) => {
  listCities.forEach(element => {
    if (req.query.name === element.name) {
      res.status(200).send({result: element.localization});
    }
  });
});

app.listen(process.env.PORT);
