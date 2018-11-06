const createNewHero = (name, age) => listHeroes.push({name, age});

/* ---- express ---- */

const express = require('express');

const app = express();

const listHeroes = [];

app.get('/getListHeroes', (req, res) => {
  res.status(200).send({result: listHeroes});
});

app.get('/createNewHero', (req, res) => {
  res.status(200).send({result: createNewHero(req.query.name, req.query.age)});
});

app.listen(process.env.PORT);
