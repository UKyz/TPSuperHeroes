const express = require('express');

const {Hero} = require('./hero.js');

const createNewHero = name => listHeroes.push(new Hero(name));

/* ---- express ---- */

const app = express();

const listHeroes = [];

app.get('/getListHeroes', (req, res) => {
  res.status(200).send({result: listHeroes});
});

app.get('/createNewHero', (req, res) => {
  res.status(200).send({result: createNewHero(req.query.name)});
});

app.listen(process.env.PORT);
