/* eslint-disable-next-line import/no-unresolved */
const express = require('express');

const {Villain} = require('./villain.js');

const createNewVillain = name => listVillains.push(new Villain(name));

/* ---- express ---- */

const app = express();

const listVillains = [];

app.get('/getListVillains', (req, res) => {
  res.status(200).send({result: listVillains});
});

app.get('/createNewVillain', (req, res) => {
  res.status(200).send({
    result: createNewVillain(req.query.name)
  });
});

app.listen(process.env.PORT);
