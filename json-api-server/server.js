/* ---- HTTP ---- */

const http = require('http');
const url = require('url');

const add_ = (a, b) => a + b;
const sub_ = (a, b) => a - b;
const mul_ = (a, b) => a * b;
const div_ = (a, b) => a / b;

const nts = (fn, x, y) => String(fn(Number(x), Number(y)));

/* ---- express ---- */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.get('/add', (req, res) => {
  res.status(200).send({result : nts(add_, req.query.var1, req.query.var2)});
});

app.get('/sub', (req, res) => {
  res.status(200).send({result : nts(sub_, req.query.var1, req.query.var2)});
});

app.get('/div', (req, res) => {
  res.status(200).send({result : nts(div_, req.query.var1, req.query.var2)});
});

app.get('/mult', (req, res) => {
  res.status(200).send({result : nts(mul_, req.query.var1, req.query.var2)});
});

/*app.post ('/push-db', (req, res) => {
 console.log(req.body);
 res.send('OK');
 });*/

/*app.post('/push-db', async (req, res) => {
  await new Blob({blob: req.body}).save();
  res.send('OK');
});*/

/*app.post('/toto', async (req, res) => {
 res.Send(await Blob.find({}).exec())
 });*/

app.listen(process.env.PORT);

/* requete : http://localhost:3000/sub?var1=2&var2=3 */
