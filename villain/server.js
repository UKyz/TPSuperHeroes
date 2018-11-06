const createNewVillain = (name, age) => listVillains.push({name, age});

/* ---- express ---- */

const express = require('express');

const app = express();

const listVillains = [];

app.get('/getListVillains', (req, res) => {
  res.status(200).send({result: listVillains});
});

app.get('/createNewVillain', (req, res) => {
  res.status(200).send({
    result: createNewVillain(req.query.name, req.query.age)
  });
});

app.listen(process.env.PORT);
