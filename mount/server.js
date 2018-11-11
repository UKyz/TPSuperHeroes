/* eslint-disable-next-line import/no-unresolved */
const express = require('express');

const {Mount} = require('./mount.js');

const createNewMount = (name, position) => listMounts.push(
  new Mount(name, position));

/* ---- express ---- */

const app = express();

const listMounts = [];

app.get('/getListMounts', (req, res) => {
  res.status(200).send({result: listMounts});
});

app.get('/createNewMount', (req, res) => {
  res.status(200).send({result: createNewMount(req.query.name)});
});

app.listen(process.env.PORT);
